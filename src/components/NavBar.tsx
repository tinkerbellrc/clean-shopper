export type NavView = 'browse' | 'search' | 'chat'

interface NavBarProps {
  activeView: NavView
  onNavigate: (view: NavView) => void
  cartCount?: number
}

export function NavBar({ activeView, onNavigate, cartCount = 0 }: NavBarProps) {
  return (
    <nav className="sticky top-0 z-10 flex items-center justify-between bg-snow-white px-800 py-400" style={{ borderBottom: '1px solid rgba(28,58,19,0.08)' }}>

      <button
        onClick={() => onNavigate('browse')}
        className="text-400 font-medium tracking-tight text-seed-green"
      >
        Clean Shopper
      </button>

      <div className="flex items-center gap-800">
        {(['search', 'chat'] as const).map((v, i) => (
          <button
            key={v}
            onClick={() => onNavigate(v)}
            className={[
              'text-350 transition-colors',
              activeView === v
                ? 'font-medium text-seed-green'
                : 'font-normal text-seed-green-50 hover:text-seed-green',
            ].join(' ')}
          >
            {['Search', 'Ask AI'][i]}
          </button>
        ))}

        <button
          className="relative text-350 font-normal text-seed-green-50 hover:text-seed-green transition-colors"
          aria-label={cartCount > 0 ? `Cart, ${cartCount} items` : 'Cart'}
        >
          Cart
          {cartCount > 0 && (
            <span className="absolute -top-100 -right-200 flex h-400 w-400 items-center justify-center rounded-full bg-seed-green text-300 font-medium text-snow-white">
              {cartCount}
            </span>
          )}
        </button>
      </div>

    </nav>
  )
}
