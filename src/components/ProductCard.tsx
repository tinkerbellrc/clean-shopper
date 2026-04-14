export type SafetyLevel = 'clean' | 'caution' | 'avoid'

interface ProductCardProps {
  name: string
  safetyLevel: SafetyLevel
  category: string
  description: string
  imageUrl?: string | null
  isBestMatch?: boolean
  preferenceNote?: string
  onClick?: () => void
  className?: string
}

const safetyConfig: Record<SafetyLevel, { grade: string; bg: string; label: string }> = {
  clean:   { grade: 'A', bg: 'bg-garden',      label: 'Clean'   },
  caution: { grade: 'C', bg: 'bg-clay',        label: 'Caution' },
  avoid:   { grade: 'D', bg: 'bg-terracotta',  label: 'Avoid'   },
}

export function ProductCard({
  name,
  safetyLevel,
  category,
  description,
  imageUrl,
  isBestMatch = false,
  preferenceNote,
  onClick,
  className = '',
}: ProductCardProps) {
  const safety = safetyConfig[safetyLevel]
  const isClickable = typeof onClick === 'function'

  return (
    <div className={`flex flex-col ${className}`}>
      {/* Best match badge — rendered above the card, not inside it */}
      {isBestMatch && (
        <div className="mb-sp-2 inline-flex items-center rounded-tag bg-moss px-sp-2 py-sp-1">
          <span className="text-micro font-semibold text-warm-white">✦ Best match</span>
        </div>
      )}

      {/* Card — flex-1 so it fills remaining height when className includes flex-1 */}
      <div
        className={[
          'flex-1 bg-warm-white border border-dune rounded-card p-sp-6 shadow-none',
          isClickable ? 'cursor-pointer hover:bg-warm-white transition-colors' : '',
        ].join(' ')}
        onClick={onClick}
        role={isClickable ? 'button' : undefined}
        tabIndex={isClickable ? 0 : undefined}
        onKeyDown={isClickable ? (e) => e.key === 'Enter' && onClick?.() : undefined}
      >
        {/* Product image — 1:1 aspect ratio */}
        {imageUrl && (
          <div className="mb-sp-4 aspect-square w-full overflow-hidden rounded-tag bg-linen">
            <img
              src={imageUrl}
              alt={name}
              className="h-full w-full object-contain mix-blend-multiply"
            />
          </div>
        )}

        {/* Top row: product name + safety badge */}
        <div className="flex items-start justify-between gap-sp-2">
          <h2 className="text-heading-s font-semibold text-charcoal">
            {name}
          </h2>

          {/* Safety badge */}
          <div
            className={`${safety.bg} w-sp-12 h-sp-12 rounded-full flex shrink-0 items-center justify-center`}
            aria-label={`Safety level: ${safety.label}`}
          >
            <span className="text-label font-semibold text-warm-white">
              {safety.grade}
            </span>
          </div>
        </div>

        {/* Category tag */}
        <div className="mt-sp-3">
          <span className="inline-flex items-center rounded-tag bg-sage-15 px-sp-2 py-sp-1 text-label font-medium text-moss">
            {category}
          </span>
        </div>

        {/* Description */}
        <p className="mt-sp-3 text-body font-normal text-stone">
          {description}
        </p>

        {/* Preference note — only rendered when provided */}
        {preferenceNote && (
          <p className="mt-sp-3 border-l-2 border-sage pl-sp-2 text-label font-normal text-stone">
            {preferenceNote}
          </p>
        )}
      </div>
    </div>
  )
}
