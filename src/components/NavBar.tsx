export type NavView = 'browse' | 'search'

interface NavBarProps {
  activeView: NavView
  onNavigate: (view: NavView) => void
}

const NAV_ITEMS: { id: NavView; label: string }[] = [
  { id: 'browse', label: 'Browse' },
  { id: 'search', label: 'Search' },
]

export function NavBar({ activeView, onNavigate }: NavBarProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-dune bg-warm-white/90 backdrop-blur-sm">
      <div className="flex items-center justify-between px-sp-8 py-sp-4">

        {/* Wordmark */}
        <div className="flex items-center gap-sp-2">
          <span className="flex h-sp-8 w-sp-8 items-center justify-center rounded-full bg-sage">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 2C5.5 2 3.5 4 3.5 6.5C3.5 9.5 8 14 8 14C8 14 12.5 9.5 12.5 6.5C12.5 4 10.5 2 8 2Z"
                fill="currentColor" className="text-warm-white" />
            </svg>
          </span>
          <span className="text-heading-s font-semibold text-charcoal tracking-tight">
            Clean Shopper
          </span>
        </div>

        {/* Navigation tabs */}
        <nav className="flex items-center gap-sp-1" role="navigation" aria-label="Main navigation">
          {NAV_ITEMS.map(({ id, label }) => {
            const isActive = activeView === id
            return (
              <button
                key={id}
                onClick={() => onNavigate(id)}
                aria-current={isActive ? 'page' : undefined}
                className={[
                  'rounded-full px-sp-4 py-sp-2 text-label font-semibold transition-colors',
                  isActive
                    ? 'bg-sage text-warm-white'
                    : 'text-stone hover:bg-sage-15 hover:text-moss',
                ].join(' ')}
              >
                {label}
              </button>
            )
          })}
        </nav>

      </div>
    </header>
  )
}
