import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { ProductCard } from '../../components/ProductCard'
import type { DbProduct } from './data'

function SkeletonCard() {
  return (
    <div className="animate-pulse">
      <div className="bg-linen border border-dune rounded-card p-sp-6">
        <div className="flex items-start justify-between gap-sp-2">
          <div className="h-sp-6 w-48 rounded-tag bg-dune" />
          <div className="h-sp-12 w-sp-12 shrink-0 rounded-full bg-dune" />
        </div>
        <div className="mt-sp-3 h-sp-4 w-24 rounded-tag bg-dune" />
        <div className="mt-sp-3 space-y-sp-2">
          <div className="h-sp-3 w-full rounded-tag bg-dune" />
          <div className="h-sp-3 w-4/5 rounded-tag bg-dune" />
        </div>
      </div>
      <div className="mt-sp-3 h-sp-8 w-full rounded-full bg-dune" />
    </div>
  )
}

export function BrowsePage() {
  const [products, setProducts] = useState<DbProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState('All')
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set())

  useEffect(() => {
    supabase
      .from('products')
      .select('*')
      .order('category')
      .order('name')
      .then(({ data, error }) => {
        if (error) setError(error.message)
        else setProducts(data ?? [])
        setLoading(false)
      })
  }, [])

  const categories = [
    'All',
    ...Array.from(new Set(products.map(p => p.category))).sort(),
  ]

  const visible = activeCategory === 'All'
    ? products
    : products.filter(p => p.category === activeCategory)

  function toggleSaved(id: string) {
    setSavedIds(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <div className="bg-linen min-h-screen font-sans">

      {/* ── Page header ──────────────────────────────────────────────── */}
      <div className="border-b border-dune px-sp-8 pt-sp-12 pb-sp-6">
        <h1 className="text-heading-l font-bold text-charcoal">Browse Products</h1>
        <p className="mt-sp-2 text-body font-normal text-stone">
          Clean-rated picks across home, personal care, and baby.
        </p>

        {/* Category filter pills */}
        <div className="mt-sp-6 flex flex-wrap gap-sp-2">
          {(loading ? ['All'] : categories).map(cat => {
            const isActive = cat === activeCategory
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                disabled={loading}
                className={[
                  'rounded-full px-sp-4 py-sp-2 text-label font-semibold transition-colors',
                  isActive
                    ? 'bg-sage text-warm-white'
                    : 'border border-dune text-stone hover:border-sage hover:text-moss',
                ].join(' ')}
              >
                {cat}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Product grid ─────────────────────────────────────────────── */}
      <div className="px-sp-8 py-sp-8">

        {/* Error state */}
        {error && (
          <div className="rounded-card border border-terracotta bg-terracotta-12 p-sp-6">
            <p className="text-body font-semibold text-terracotta">Couldn't load products</p>
            <p className="mt-sp-1 text-label font-normal text-stone">{error}</p>
          </div>
        )}

        {/* Product count — hidden while loading */}
        {!loading && !error && (
          <p className="mb-sp-6 text-label font-medium text-stone">
            {visible.length} {visible.length === 1 ? 'product' : 'products'}
          </p>
        )}

        <div className="grid grid-cols-1 gap-sp-6 sm:grid-cols-2 lg:grid-cols-3">

          {/* Loading skeletons */}
          {loading && Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}

          {/* Live data */}
          {!loading && !error && visible.map(product => {
            const saved = savedIds.has(product.id)
            return (
              <div key={product.id} className="flex flex-col gap-sp-3">
                <ProductCard
                  name={product.name}
                  safetyLevel={product.safety_level ?? 'clean'}
                  category={product.category}
                  description={product.description}
                  imageUrl={product.image_url}
                  className="flex-1"
                />
                <button
                  onClick={() => toggleSaved(product.id)}
                  className={[
                    'w-full rounded-full px-sp-6 py-sp-3 text-label font-semibold transition-colors',
                    saved
                      ? 'bg-sage text-warm-white'
                      : 'border border-sage text-sage hover:border-moss hover:text-moss',
                  ].join(' ')}
                  aria-pressed={saved}
                >
                  {saved ? '✓ Saved' : 'Save to List'}
                </button>
              </div>
            )
          })}

        </div>
      </div>

    </div>
  )
}
