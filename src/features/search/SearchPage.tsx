import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { ProductCard, type SafetyLevel } from '../../components/ProductCard'

interface Product {
  id: string
  name: string
  brand: string
  category: string
  description: string
  safety_level: SafetyLevel
  image_url: string | null
}

type Status = 'idle' | 'loading' | 'done' | 'error'

// ── Skeleton card ────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="animate-pulse bg-linen border border-dune rounded-card p-sp-6">
      <div className="flex items-start justify-between gap-sp-2">
        <div className="h-sp-6 w-40 rounded-tag bg-dune" />
        <div className="h-sp-12 w-sp-12 shrink-0 rounded-full bg-dune" />
      </div>
      <div className="mt-sp-3 h-sp-4 w-20 rounded-tag bg-dune" />
      <div className="mt-sp-3 space-y-sp-2">
        <div className="h-sp-3 w-full rounded-tag bg-dune" />
        <div className="h-sp-3 w-3/4 rounded-tag bg-dune" />
      </div>
    </div>
  )
}

// ── Empty / no-results state ─────────────────────────────────────────────────

interface EmptyStateProps {
  headline: string
  body: string
  action?: { label: string; onClick: () => void }
}

function EmptyState({ headline, body, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-sp-4 text-center px-sp-8 max-w-[480px] mx-auto pt-sp-12">
      <h2 className="text-heading-m font-semibold text-charcoal">{headline}</h2>
      <p className="text-body font-normal text-stone">{body}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="mt-sp-2 rounded-full border border-sage px-sp-6 py-sp-3 text-label font-semibold text-sage hover:border-moss hover:text-moss transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  )
}

// ── Search page ──────────────────────────────────────────────────────────────

export function SearchPage() {
  const [query, setQuery]       = useState('')
  const [committed, setCommitted] = useState('')
  const [results, setResults]   = useState<Product[]>([])
  const [status, setStatus]     = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const canSubmit = query.trim().length > 0 && status !== 'loading'

  async function handleSearch() {
    const term = query.trim()
    if (!term) return

    setCommitted(term)
    setStatus('loading')
    setErrorMsg(null)

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .not('image_url', 'is', null)
      .or(`name.ilike.%${term}%,brand.ilike.%${term}%,description.ilike.%${term}%`)
      .order('name')

    if (error) {
      setErrorMsg(error.message)
      setStatus('error')
    } else {
      setResults(data ?? [])
      setStatus('done')
    }
  }

  function handleClear() {
    setQuery('')
    setCommitted('')
    setResults([])
    setStatus('idle')
    setErrorMsg(null)
  }

  const isLoading  = status === 'loading'
  const hasResults = status === 'done' && results.length > 0
  const isEmpty    = status === 'done' && results.length === 0

  return (
    <div className="bg-linen min-h-screen font-sans">

      {/* ── Page header + search bar ──────────────────────────────────── */}
      <div className="border-b border-dune px-sp-8 pt-sp-12 pb-sp-8">
        <h1 className="text-heading-l font-bold text-charcoal">Search Products</h1>
        <p className="mt-sp-2 text-body font-normal text-stone">
          Search by product name, brand, or keyword.
        </p>

        {/* Search bar — spec: bg-linen, border-dune, rounded-full, focus → border-sage */}
        <form
          className="mt-sp-6"
          onSubmit={e => { e.preventDefault(); handleSearch() }}
        >
          <div
            className={[
              'flex w-full items-center gap-sp-3 rounded-full bg-linen px-sp-6 py-sp-3 border transition-colors',
              status === 'error'
                ? 'border-terracotta'
                : 'border-dune focus-within:border-sage',
            ].join(' ')}
          >
            {/* Input */}
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="What are you looking for today?"
              disabled={isLoading}
              className="flex-1 bg-transparent text-body font-normal text-charcoal placeholder:text-stone outline-none disabled:cursor-not-allowed"
            />

            {/* Send button — spec: w-sp-8 h-sp-8, bg-sage, hover:bg-moss */}
            <button
              type="submit"
              disabled={!canSubmit}
              aria-label="Search"
              className="flex h-sp-8 w-sp-8 shrink-0 items-center justify-center rounded-full bg-sage transition-colors hover:bg-moss disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                /* ThinkingIndicator — three warm-white dots, staggered bounce */
                <span className="flex items-center gap-sp-1">
                  {[0, 150, 300].map(delay => (
                    <span
                      key={delay}
                      className="h-sp-1 w-sp-1 rounded-full bg-warm-white animate-bounce"
                      style={{ animationDelay: `${delay}ms` }}
                    />
                  ))}
                </span>
              ) : (
                /* Search icon */
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                  <circle cx="6.5" cy="6.5" r="4.5" stroke="#FAFAF7" strokeWidth="1.5" />
                  <path d="M10.5 10.5L13.5 13.5" stroke="#FAFAF7" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>

          {/* Error message below bar — spec: text-micro text-terracotta */}
          {status === 'error' && errorMsg && (
            <p className="mt-sp-2 text-micro text-terracotta">{errorMsg}</p>
          )}
        </form>
      </div>

      {/* ── Results area ─────────────────────────────────────────────── */}
      <div className="px-sp-8 py-sp-8">

        {/* Idle — no search yet */}
        {status === 'idle' && (
          <EmptyState
            headline="What are you looking for?"
            body="Try searching 'soap', 'fragrance-free', or 'Seventh Generation'."
          />
        )}

        {/* Loading — skeleton grid */}
        {isLoading && (
          <div className="grid grid-cols-1 gap-sp-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {/* Results */}
        {hasResults && (
          <>
            <p className="mb-sp-6 text-label font-medium text-stone">
              {results.length} {results.length === 1 ? 'result' : 'results'} for &ldquo;{committed}&rdquo;
            </p>
            <div className="grid grid-cols-1 gap-sp-6 sm:grid-cols-2 lg:grid-cols-3">
              {results.map(product => (
                <ProductCard
                  key={product.id}
                  name={product.name}
                  safetyLevel={product.safety_level}
                  category={product.category}
                  description={product.description}
                  imageUrl={product.image_url}
                />
              ))}
            </div>
          </>
        )}

        {/* No results */}
        {isEmpty && (
          <EmptyState
            headline="No products found"
            body={`No matches for "${committed}". Try a different keyword or check the spelling.`}
            action={{ label: 'Clear search', onClick: handleClear }}
          />
        )}

      </div>
    </div>
  )
}
