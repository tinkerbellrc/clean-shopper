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

function SkeletonCard() {
  return (
    <div className="animate-pulse bg-snow-white rounded-md p-600">
      <div className="aspect-square w-full rounded-sm bg-faded-green-20 mb-400" />
      <div className="h-400 w-3/4 rounded-full bg-faded-green-20 mb-200" />
      <div className="h-300 w-1/3 rounded-full bg-faded-green-20 mb-300" />
      <div className="space-y-200">
        <div className="h-300 w-full rounded-full bg-faded-green-20" />
        <div className="h-300 w-3/4 rounded-full bg-faded-green-20" />
      </div>
    </div>
  )
}

export function SearchPage() {
  const [query, setQuery]         = useState('')
  const [committed, setCommitted] = useState('')
  const [results, setResults]     = useState<Product[]>([])
  const [status, setStatus]       = useState<Status>('idle')
  const [errorMsg, setErrorMsg]   = useState<string | null>(null)

  const canSubmit = query.trim().length > 0 && status !== 'loading'
  const isLoading  = status === 'loading'
  const hasResults = status === 'done' && results.length > 0
  const isEmpty    = status === 'done' && results.length === 0

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
    if (error) { setErrorMsg(error.message); setStatus('error') }
    else { setResults(data ?? []); setStatus('done') }
  }

  function handleClear() {
    setQuery(''); setCommitted(''); setResults([]); setStatus('idle'); setErrorMsg(null)
  }

  return (
    <div className="min-h-screen font-sans">

      {/* ── Dark hero + search bar ── */}
      <div className="bg-seed-green px-800 pt-1600 pb-1400">
        <p className="text-300 font-medium uppercase mb-400" style={{ color: 'rgba(252,252,247,0.45)', letterSpacing: '0.1em' }}>
          Search
        </p>
        <h1 className="text-1000 font-default tracking-tight text-snow-white mb-1000" style={{ lineHeight: 1.05 }}>
          Find what's<br />safe for you.
        </h1>

        {/* Search bar — on dark bg */}
        <form onSubmit={e => { e.preventDefault(); handleSearch() }}>
          <div
            className={[
              'flex w-full items-center gap-300 rounded-full bg-snow-white px-600 py-300 transition-colors',
              status === 'error' ? 'ring-2 ring-error' : '',
            ].join(' ')}
          >
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Product name, brand, or ingredient…"
              disabled={isLoading}
              className="flex-1 bg-transparent text-400 font-normal text-seed-green placeholder:text-seed-green-50 outline-none disabled:cursor-not-allowed"
            />
            <button
              type="submit"
              disabled={!canSubmit}
              aria-label="Search"
              className="flex h-800 w-800 shrink-0 items-center justify-center rounded-full bg-seed-green transition-colors hover:bg-soft-green disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center gap-100">
                  {[0, 150, 300].map(d => (
                    <span key={d} className="h-100 w-100 rounded-full bg-snow-white animate-bounce" style={{ animationDelay: `${d}ms` }} />
                  ))}
                </span>
              ) : (
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <circle cx="6.5" cy="6.5" r="4.5" stroke="#fcfcf7" strokeWidth="1.5" />
                  <path d="M10.5 10.5L13.5 13.5" stroke="#fcfcf7" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>
          {status === 'error' && errorMsg && (
            <p className="mt-200 text-300" style={{ color: '#f87171' }}>{errorMsg}</p>
          )}
        </form>
      </div>

      {/* ── Stacked results section ── */}
      <div
        className="bg-yellowish-white px-800 pt-1200 pb-1600"
        style={{ borderRadius: '32px 32px 0 0', marginTop: '-32px' }}
      >
        {/* Idle */}
        {status === 'idle' && (
          <div className="flex flex-col items-center gap-400 text-center pt-1200 max-w-md mx-auto">
            <h2 className="text-600 font-default tracking-tight text-seed-green">What are you looking for?</h2>
            <p className="text-400 font-normal text-seed-green-70">Try "soap", "fragrance-free", or "Seventh Generation".</p>
          </div>
        )}

        {/* Loading */}
        {isLoading && (
          <div className="grid grid-cols-1 gap-600 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {/* Results */}
        {hasResults && (
          <>
            <p className="mb-800 text-300 font-medium uppercase" style={{ color: 'rgba(28,58,19,0.35)', letterSpacing: '0.08em' }}>
              {results.length} {results.length === 1 ? 'result' : 'results'} for "{committed}"
            </p>
            <div className="grid grid-cols-1 gap-600 sm:grid-cols-2 lg:grid-cols-3">
              {results.map(p => (
                <ProductCard key={p.id} name={p.name} safetyLevel={p.safety_level} category={p.category} description={p.description} imageUrl={p.image_url} />
              ))}
            </div>
          </>
        )}

        {/* No results */}
        {isEmpty && (
          <div className="flex flex-col items-center gap-400 text-center pt-1200 max-w-md mx-auto">
            <h2 className="text-600 font-default tracking-tight text-seed-green">No products found</h2>
            <p className="text-400 font-normal text-seed-green-70">No matches for "{committed}". Try a different keyword.</p>
            <button
              onClick={handleClear}
              className="mt-200 rounded-full bg-seed-green px-600 py-300 text-350 font-medium text-snow-white hover:bg-soft-green transition-colors"
            >
              Clear search
            </button>
          </div>
        )}
      </div>

    </div>
  )
}
