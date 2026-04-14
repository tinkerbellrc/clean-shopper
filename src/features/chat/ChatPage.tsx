import { useEffect, useRef, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { streamChat, type ClaudeMessage } from '../../lib/claude'
import { ProductCard } from '../../components/ProductCard'
import type { ChatProduct, Message } from './types'

// ── Suggested starter prompts ─────────────────────────────────────────────────

const SUGGESTED_PROMPTS = [
  'What are some fragrance-free shampoos?',
  'What ingredients should I avoid in sunscreen?',
  'Recommend a clean dish soap',
  'Is sodium lauryl sulfate safe?',
]

// ── System prompt ─────────────────────────────────────────────────────────────
// All products are passed so Claude can reason across the full catalog.
// Claude signals which products to show via a <recommend> tag that we strip
// from the displayed text after streaming completes.

function buildSystemPrompt(products: ChatProduct[]): string {
  const catalog =
    products.length > 0
      ? products
          .map(
            p =>
              `ID:${p.id} | ${p.name} by ${p.brand} (${p.category}) | Safety: ${p.safety_level}\n  ${p.description}`,
          )
          .join('\n')
      : 'No products in catalog yet.'

  return `You are a product safety assistant for Clean Shopper, a trusted app that helps people find clean, safe personal care and household products.

Your role:
- Help users understand safety ratings: clean = A grade (safe), caution = C grade (some concerns), avoid = D grade (not recommended)
- Explain ingredients clearly — what they do and any safety concerns
- Answer questions about certifications, product claims, and formulations
- Recommend products from our catalog when a user asks for suggestions

Keep responses concise and warm — 2 to 4 sentences unless the question genuinely needs more. Be honest when uncertain. Never alarming — always informative and empowering.

Write in plain prose only. Do not use markdown — no asterisks for bold, no bullet points, no headers, no backticks.

Our full product catalog (use these IDs exactly):
${catalog}

IMPORTANT — when you recommend specific products, append this tag at the very end of your message, after all text:
<recommend>id-one,id-two,id-three</recommend>
Rules:
- Use the exact IDs from the catalog above (the part after "ID:")
- Maximum 3 products per response
- Only include this tag when recommending products — omit it for general questions
- Never show the tag text itself in your response prose`
}

// ── Parse and strip the <recommend> tag from a completed response ──────────────

function extractRecommendations(
  content: string,
  allProducts: ChatProduct[],
): { cleanContent: string; products: ChatProduct[] } {
  const match = content.match(/<recommend>([\s\S]*?)<\/recommend>/)
  if (!match) return { cleanContent: content.trim(), products: [] }

  const ids = match[1].split(',').map(s => s.trim()).filter(Boolean)
  const products = ids
    .map(id => allProducts.find(p => p.id === id))
    .filter((p): p is ChatProduct => p !== undefined)

  const cleanContent = content.replace(/<recommend>[\s\S]*?<\/recommend>/, '').trim()
  return { cleanContent, products }
}

// ── Thinking dots ─────────────────────────────────────────────────────────────

function ThinkingDots() {
  return (
    <div className="flex items-center gap-[6px] px-sp-6 py-sp-4">
      {[0, 150, 300].map(delay => (
        <span
          key={delay}
          className="h-2 w-2 animate-pulse rounded-full bg-sage"
          style={{ animationDelay: `${delay}ms` }}
        />
      ))}
    </div>
  )
}

// ── Chat page ─────────────────────────────────────────────────────────────────

export function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isThinking, setIsThinking] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  // Ref so onDone closure always sees latest products without stale capture
  const allProductsRef = useRef<ChatProduct[]>([])

  // Load full catalog once on mount
  useEffect(() => {
    supabase
      .from('products')
      .select('*')
      .not('image_url', 'is', null)
      .order('name')
      .then(({ data }) => {
        allProductsRef.current = (data ?? []).map(
          (p: {
            id: string
            name: string
            brand: string
            category: string
            description: string
            safety_level: 'clean' | 'caution' | 'avoid'
          }) => ({
            id: p.id,
            name: p.name,
            brand: p.brand,
            category: p.category,
            description: p.description,
            safety_level: p.safety_level,
          }),
        )
      })
  }, [])

  // Scroll to bottom whenever messages update or thinking state changes
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isThinking])

  async function handleSubmit(overrideText?: string) {
    const text = (overrideText ?? input).trim()
    if (!text || isThinking) return

    setInput('')
    setIsThinking(true)

    // Add user message immediately
    const userMsg: Message = { id: crypto.randomUUID(), role: 'user', content: text }
    setMessages(prev => [...prev, userMsg])

    // Build Claude message history (no product metadata — just text)
    const history: ClaudeMessage[] = [
      ...messages.map(m => ({ role: m.role as 'user' | 'assistant', content: m.content })),
      { role: 'user', content: text },
    ]

    // assistantId is set on first chunk and used by subsequent chunks + onDone
    let assistantId = ''

    streamChat(
      history,
      buildSystemPrompt(allProductsRef.current),
      (chunk) => {
        if (!assistantId) {
          assistantId = crypto.randomUUID()
          setIsThinking(false)
          setMessages(prev => [
            ...prev,
            { id: assistantId, role: 'assistant', content: chunk },
          ])
        } else {
          setMessages(prev =>
            prev.map(m =>
              m.id === assistantId ? { ...m, content: m.content + chunk } : m,
            ),
          )
        }
      },
      () => {
        // Streaming done — parse <recommend> tag and attach product cards
        setMessages(prev =>
          prev.map(m => {
            if (m.id !== assistantId) return m
            const { cleanContent, products } = extractRecommendations(
              m.content,
              allProductsRef.current,
            )
            return { ...m, content: cleanContent, products }
          }),
        )
        inputRef.current?.focus()
      },
      (err) => {
        setIsThinking(false)
        setMessages(prev => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: 'assistant',
            content: `Something went wrong: ${err.message}`,
          },
        ])
      },
    )
  }

  const isEmpty = messages.length === 0
  const canSubmit = input.trim().length > 0 && !isThinking

  return (
    <div className="flex h-full flex-col bg-linen font-sans">

      {/* ── Messages area ─────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto">
        {isEmpty ? (

          /* Empty / welcome state */
          <div className="mx-auto flex max-w-[560px] flex-col items-center gap-sp-8 px-sp-6 pt-sp-16">
            <div className="text-center">
              <h1 className="text-heading-l font-bold text-charcoal">Ask anything</h1>
              <p className="mx-auto mt-sp-3 max-w-[380px] text-body font-normal text-stone">
                Ask about product safety, ingredients to watch out for, or let me recommend something clean.
              </p>
            </div>

            {/* Suggested prompt chips */}
            <div className="flex flex-wrap justify-center gap-sp-3">
              {SUGGESTED_PROMPTS.map(prompt => (
                <button
                  key={prompt}
                  onClick={() => handleSubmit(prompt)}
                  className="rounded-full border border-dune bg-warm-white px-sp-4 py-sp-2 text-label font-medium text-stone transition-colors hover:border-sage hover:text-charcoal"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

        ) : (

          /* Message list */
          <div className="mx-auto max-w-[640px] space-y-sp-6 px-sp-6 py-sp-8">
            {messages.map(message =>
              message.role === 'user' ? (

                /* User message — right-aligned */
                <div key={message.id} className="flex justify-end">
                  <div className="max-w-[80%] rounded-card border border-dune bg-warm-white px-sp-6 py-sp-4">
                    <p className="text-body font-normal text-charcoal">{message.content}</p>
                  </div>
                </div>

              ) : (

                /* Assistant message — reading surface + product cards */
                <div key={message.id} className="space-y-sp-4">
                  <div className="rounded-card border border-dune bg-warm-white px-sp-6 py-sp-6">
                    <p className="max-w-[60ch] text-body font-normal leading-relaxed text-charcoal">
                      {message.content}
                    </p>
                  </div>

                  {/* Product cards — only shown when Claude explicitly recommends them */}
                  {message.products && message.products.length > 0 && (
                    <div className="space-y-sp-3">
                      {message.products.map((product, i) => (
                        <div
                          key={product.id}
                          className="animate-fade-in opacity-0"
                          style={{
                            animationDelay: `${i * 120}ms`,
                            animationFillMode: 'forwards',
                          }}
                        >
                          <ProductCard
                            name={product.name}
                            safetyLevel={product.safety_level}
                            category={product.category}
                            description={product.description}
                            imageUrl={product.image_url}
                            preferenceNote={product.brand}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ),
            )}

            {/* Thinking dots — while loading + waiting for first chunk */}
            {isThinking && <ThinkingDots />}

            <div ref={bottomRef} />
          </div>
        )}
      </div>

      {/* ── Input bar (pinned to bottom) ──────────────────────────────── */}
      <div className="border-t border-dune bg-warm-white px-sp-6 py-sp-4">
        <form
          className="mx-auto max-w-[640px]"
          onSubmit={e => {
            e.preventDefault()
            handleSubmit()
          }}
        >
          <div className="flex items-center gap-sp-3 rounded-full border border-dune bg-linen px-sp-6 py-sp-3 transition-colors focus-within:border-sage">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask about ingredients, safety, or get a recommendation…"
              disabled={isThinking}
              className="flex-1 bg-transparent text-body font-normal text-charcoal placeholder:text-stone outline-none disabled:cursor-not-allowed"
            />

            {/* Send button */}
            <button
              type="submit"
              disabled={!canSubmit}
              aria-label="Send"
              className="flex h-sp-8 w-sp-8 shrink-0 items-center justify-center rounded-full bg-sage transition-colors hover:bg-moss disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isThinking ? (
                <span className="flex items-center gap-[3px]">
                  {[0, 150, 300].map(delay => (
                    <span
                      key={delay}
                      className="h-sp-1 w-sp-1 animate-bounce rounded-full bg-warm-white"
                      style={{ animationDelay: `${delay}ms` }}
                    />
                  ))}
                </span>
              ) : (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path
                    d="M7 12V2M7 2L2 7M7 2L12 7"
                    stroke="#FAFAF7"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          </div>
        </form>
      </div>

    </div>
  )
}
