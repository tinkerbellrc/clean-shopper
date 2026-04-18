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

const safetyConfig: Record<SafetyLevel, { grade: string; bg: string; text: string; label: string }> = {
  clean:   { grade: 'A', bg: 'bg-bright-green',  text: 'text-seed-green',  label: 'Clean'   },
  caution: { grade: 'C', bg: 'bg-warning',        text: 'text-seed-green',  label: 'Caution' },
  avoid:   { grade: 'D', bg: 'bg-error',          text: 'text-snow-white',  label: 'Avoid'   },
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
      {/* Best match badge — above the card */}
      {isBestMatch && (
        <div className="mb-200 inline-flex items-center rounded-full bg-soft-green px-300 py-100">
          <span className="text-300 font-medium text-snow-white">✦ Best match</span>
        </div>
      )}

      <div
        className={[
          'flex-1 bg-snow-white rounded-md p-600',
          isClickable ? 'cursor-pointer hover:bg-cool-neutral-20 transition-colors' : '',
        ].join(' ')}
        onClick={onClick}
        role={isClickable ? 'button' : undefined}
        tabIndex={isClickable ? 0 : undefined}
        onKeyDown={isClickable ? (e) => e.key === 'Enter' && onClick?.() : undefined}
      >
        {/* Product image — 1:1 aspect ratio */}
        {imageUrl && (
          <div className="mb-400 aspect-square w-full overflow-hidden rounded-sm bg-foam-white">
            <img
              src={imageUrl}
              alt={name}
              className="h-full w-full object-contain mix-blend-multiply"
            />
          </div>
        )}

        {/* Top row: product name + safety badge */}
        <div className="flex items-start justify-between gap-200">
          <h2 className="text-400 font-medium leading-snug tracking-tight text-seed-green">
            {name}
          </h2>

          {/* Safety badge */}
          <div
            className={`${safety.bg} ${safety.text} w-1200 h-1200 rounded-full flex shrink-0 items-center justify-center`}
            aria-label={`Safety level: ${safety.label}`}
          >
            <span className="text-350 font-medium">
              {safety.grade}
            </span>
          </div>
        </div>

        {/* Category tag */}
        <div className="mt-300">
          <span className="inline-flex items-center rounded-full bg-seed-green-10 px-300 py-100 text-300 font-medium text-seed-green">
            {category}
          </span>
        </div>

        {/* Description */}
        <p className="mt-300 text-350 font-normal leading-body text-seed-green-70">
          {description}
        </p>

        {/* Preference note */}
        {preferenceNote && (
          <p className="mt-300 border-l-2 border-seed-green-20 pl-300 text-300 font-normal text-seed-green-70">
            {preferenceNote}
          </p>
        )}
      </div>
    </div>
  )
}
