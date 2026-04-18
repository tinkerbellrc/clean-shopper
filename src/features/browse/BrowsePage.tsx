import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { ProductCard } from '../../components/ProductCard'
import type { DbProduct } from './data'

function SkeletonCard() {
  return (
    <div className="animate-pulse">
      <div className="bg-snow-white rounded-md p-600">
        <div className="aspect-square w-full rounded-sm bg-faded-green-20 mb-400" />
        <div className="h-400 w-3/4 rounded-full bg-faded-green-20 mb-200" />
        <div className="h-300 w-1/3 rounded-full bg-faded-green-20 mb-300" />
        <div className="space-y-200">
          <div className="h-300 w-full rounded-full bg-faded-green-20" />
          <div className="h-300 w-4/5 rounded-full bg-faded-green-20" />
        </div>
      </div>
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
      .not('image_url', 'is', null)
      .order('category')
      .order('name')
      .then(({ data, error }) => {
        if (error) setError(error.message)
        else setProducts(data ?? [])
        setLoading(false)
      })
  }, [])

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category))).sort()]
  const visible = activeCategory === 'All' ? products : products.filter(p => p.category === activeCategory)

  function toggleSaved(id: string) {
    setSavedIds(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <div className="min-h-screen font-sans">

      {/* ── Dark hero ── */}
      <div className="bg-seed-green px-800 pt-1600 pb-1400">
        <p className="text-300 font-medium uppercase tracking-widest mb-400" style={{ color: 'rgba(252,252,247,0.45)', letterSpacing: '0.1em' }}>
          Product Catalog
        </p>
        <h1 className="text-1000 font-default tracking-tight text-snow-white" style={{ lineHeight: 1.05 }}>
          Everything<br />clean, rated.
        </h1>
        <p className="mt-400 text-400 font-normal" style={{ color: 'rgba(252,252,247,0.6)', maxWidth: '420px' }}>
          Curated picks across home, personal care, and baby — scored for safety.
        </p>

        {/* Category pills */}
        <div className="mt-1000 flex flex-wrap gap-200">
          {(loading ? ['All'] : categories).map(cat => {
            const isActive = cat === activeCategory
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                disabled={loading}
                className={[
                  'rounded-full px-400 py-200 text-350 font-normal transition-colors',
                  isActive
                    ? 'bg-snow-white text-seed-green'
                    : 'text-snow-white hover:bg-seed-green-20',
                ].join(' ')}
                style={!isActive ? { border: '1px solid rgba(252,252,247,0.25)' } : {}}
              >
                {cat}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Stacked card content section ── */}
      <div
        className="bg-yellowish-white px-800 pt-1200 pb-1600"
        style={{ borderRadius: '32px 32px 0 0', marginTop: '-32px' }}
      >
        {/* Error */}
        {error && (
          <div className="rounded-md border border-error bg-seed-green-05 p-600 mb-800">
            <p className="text-400 font-medium text-error">Couldn't load products</p>
            <p className="mt-100 text-350 font-normal text-seed-green-70">{error}</p>
          </div>
        )}

        {/* Count */}
        {!loading && !error && (
          <p className="mb-800 text-300 font-medium uppercase tracking-widest" style={{ color: 'rgba(28,58,19,0.35)', letterSpacing: '0.08em' }}>
            {visible.length} {visible.length === 1 ? 'product' : 'products'}
          </p>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 gap-600 sm:grid-cols-2 lg:grid-cols-3">
          {loading && Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}

          {!loading && !error && visible.map(product => {
            const saved = savedIds.has(product.id)
            return (
              <div key={product.id} className="flex flex-col gap-300">
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
                    'w-full rounded-full px-600 py-300 text-350 font-medium transition-colors',
                    saved
                      ? 'bg-seed-green text-snow-white'
                      : 'text-seed-green hover:bg-seed-green-05',
                  ].join(' ')}
                  style={!saved ? { border: '1px solid rgba(28,58,19,0.2)' } : {}}
                  aria-pressed={saved}
                >
                  {saved ? '✓ Saved' : 'Save'}
                </button>
              </div>
            )
          })}
        </div>
      </div>

    </div>
  )
}
