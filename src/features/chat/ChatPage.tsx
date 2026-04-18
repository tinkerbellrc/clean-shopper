import { useEffect, useRef, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { streamChat, type ClaudeMessage } from '../../lib/claude'
import { ProductCard } from '../../components/ProductCard'
import type { ChatProduct, Message } from './types'

const SUGGESTED_PROMPTS = [
  'Fragrance-free shampoos?',
  'Ingredients to avoid in sunscreen',
  'Recommend a clean dish soap',
  'Is sodium lauryl sulfate safe?',
]

function buildSystemPrompt(products: ChatProduct[]): string {
  const catalog =
    products.length > 0
      ? products.map(p => `ID:${p.id} | ${p.name} by ${p.brand} (${p.category}) | Safety: ${p.safety_level}\n  ${p.description}`).join('\n')
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

function extractRecommendations(content: string, allProducts: ChatProduct[]): { cleanContent: string; products: ChatProduct[] } {
  const match = content.match(/<recommend>([\s\S]*?)<\/recommend>/)
  if (!match) return { cleanContent: content.trim(), products: [] }
  const ids = match[1].split(',').map(s => s.trim()).filter(Boolean)
  const products = ids.map(id => allProducts.find(p => p.id === id)).filter((p): p is ChatProduct => p !== undefined)
  return { cleanContent: content.replace(/<recommend>[\s\S]*?<\/recommend>/, '').trim(), products }
}

function ThinkingDots() {
  return (
    <div className="flex items-center gap-[6px] py-400">
      {[0, 150, 300].map(delay => (
        <span key={delay} className="h-[6px] w-[6px] animate-pulse rounded-full bg-seed-green-50" style={{ animationDelay: `${delay}ms` }} />
      ))}
    </div>
  )
}

export function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isThinking, setIsThinking] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const allProductsRef = useRef<ChatProduct[]>([])

  useEffect(() => {
    supabase.from('products').select('*').not('image_url', 'is', null).order('name')
      .then(({ data }) => {
        allProductsRef.current = (data ?? []).map((p: any) => ({
          id: p.id, name: p.name, brand: p.brand, category: p.category,
          description: p.description, safety_level: p.safety_level, image_url: p.image_url,
        }))
      })
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isThinking])

  async function handleSubmit(overrideText?: string) {
    const text = (overrideText ?? input).trim()
    if (!text || isThinking) return
    setInput('')
    setIsThinking(true)

    const userMsg: Message = { id: crypto.randomUUID(), role: 'user', content: text }
    setMessages(prev => [...prev, userMsg])

    const history: ClaudeMessage[] = [
      ...messages.map(m => ({ role: m.role as 'user' | 'assistant', content: m.content })),
      { role: 'user', content: text },
    ]

    let assistantId = ''
    streamChat(
      history,
      buildSystemPrompt(allProductsRef.current),
      (chunk) => {
        if (!assistantId) {
          assistantId = crypto.randomUUID()
          setIsThinking(false)
          setMessages(prev => [...prev, { id: assistantId, role: 'assistant', content: chunk }])
        } else {
          setMessages(prev => prev.map(m => m.id === assistantId ? { ...m, content: m.content + chunk } : m))
        }
      },
      () => {
        setMessages(prev => prev.map(m => {
          if (m.id !== assistantId) return m
          const { cleanContent, products } = extractRecommendations(m.content, allProductsRef.current)
          return { ...m, content: cleanContent, products }
        }))
        inputRef.current?.focus()
      },
      (err) => {
        setIsThinking(false)
        setMessages(prev => [...prev, { id: crypto.randomUUID(), role: 'assistant', content: `Something went wrong: ${err.message}` }])
      },
    )
  }

  const isEmpty = messages.length === 0
  const canSubmit = input.trim().length > 0 && !isThinking

  return (
    <div className="flex h-full flex-col font-sans">

      {/* ── Messages ── */}
      <div className="flex-1 overflow-y-auto">
        {isEmpty ? (

          /* Welcome state — dark hero */
          <div className="flex flex-col h-full">
            <div className="bg-seed-green px-800 pt-1600 pb-1400">
              <p className="text-300 font-medium uppercase mb-400" style={{ color: 'rgba(252,252,247,0.45)', letterSpacing: '0.1em' }}>
                Ask AI
              </p>
              <h1 className="text-1000 font-default tracking-tight text-snow-white mb-400" style={{ lineHeight: 1.05 }}>
                What would you<br />like to know?
              </h1>
              <p className="text-400 font-normal" style={{ color: 'rgba(252,252,247,0.6)', maxWidth: '400px' }}>
                Ask about safety, ingredients, or get a clean product recommendation.
              </p>
            </div>

            {/* Prompt chips — stacked card */}
            <div
              className="bg-yellowish-white px-800 pt-1000 pb-800 flex-1"
              style={{ borderRadius: '32px 32px 0 0', marginTop: '-32px' }}
            >
              <p className="text-300 font-medium uppercase mb-600" style={{ color: 'rgba(28,58,19,0.35)', letterSpacing: '0.08em' }}>
                Try asking
              </p>
              <div className="flex flex-col gap-200 max-w-lg">
                {SUGGESTED_PROMPTS.map(prompt => (
                  <button
                    key={prompt}
                    onClick={() => handleSubmit(prompt)}
                    className="text-left rounded-full bg-snow-white px-600 py-300 text-350 font-normal text-seed-green-70 transition-colors hover:text-seed-green hover:bg-cool-neutral-20"
                    style={{ border: '1px solid rgba(28,58,19,0.1)' }}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          </div>

        ) : (

          /* Conversation */
          <div className="bg-yellowish-white min-h-full">
            <div className="mx-auto max-w-[640px] space-y-600 px-600 py-800">
              {messages.map(message =>
                message.role === 'user' ? (
                  <div key={message.id} className="flex justify-end">
                    <div className="max-w-[80%] rounded-xl bg-seed-green px-600 py-400">
                      <p className="text-400 font-normal text-snow-white">{message.content}</p>
                    </div>
                  </div>
                ) : (
                  <div key={message.id} className="space-y-400">
                    <div className="rounded-md bg-snow-white px-600 py-600">
                      <p className="max-w-[60ch] text-400 font-normal leading-body text-seed-green">
                        {message.content}
                      </p>
                    </div>
                    {message.products && message.products.length > 0 && (
                      <div className="space-y-300">
                        {message.products.map((product, i) => (
                          <div key={product.id} className="animate-fade-in opacity-0" style={{ animationDelay: `${i * 120}ms`, animationFillMode: 'forwards' }}>
                            <ProductCard name={product.name} safetyLevel={product.safety_level} category={product.category} description={product.description} imageUrl={product.image_url} preferenceNote={product.brand} />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )
              )}
              {isThinking && <ThinkingDots />}
              <div ref={bottomRef} />
            </div>
          </div>
        )}
      </div>

      {/* ── Input bar ── */}
      <div className="bg-snow-white px-600 py-400" style={{ borderTop: '1px solid rgba(28,58,19,0.08)' }}>
        <form className="mx-auto max-w-[640px]" onSubmit={e => { e.preventDefault(); handleSubmit() }}>
          <div
            className="flex items-center gap-300 rounded-full bg-yellowish-white px-600 py-300 transition-colors focus-within:ring-1 focus-within:ring-seed-green-20"
            style={{ border: '1px solid rgba(28,58,19,0.12)' }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask about ingredients, safety, or get a recommendation…"
              disabled={isThinking}
              className="flex-1 bg-transparent text-400 font-normal text-seed-green placeholder:text-seed-green-50 outline-none disabled:cursor-not-allowed"
            />
            <button
              type="submit"
              disabled={!canSubmit}
              aria-label="Send"
              className="flex h-800 w-800 shrink-0 items-center justify-center rounded-full bg-seed-green transition-colors hover:bg-soft-green disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isThinking ? (
                <span className="flex items-center gap-[3px]">
                  {[0, 150, 300].map(delay => (
                    <span key={delay} className="h-100 w-100 animate-bounce rounded-full bg-snow-white" style={{ animationDelay: `${delay}ms` }} />
                  ))}
                </span>
              ) : (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 12V2M7 2L2 7M7 2L12 7" stroke="#fcfcf7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          </div>
        </form>
      </div>

    </div>
  )
}
