import { ProductCard } from './components/ProductCard'

const mockProducts = [
  {
    id: '1',
    name: 'Free & Clear Dish Soap',
    safetyLevel: 'clean' as const,
    category: 'Kitchen',
    description: 'Plant-based formula with no dyes, fragrances, or synthetic preservatives. EWG Verified and biodegradable.',
    imageUrl: 'https://m.media-amazon.com/images/I/81iPas+IoBL._AC_SL1500_.jpg',
    isBestMatch: true,
    preferenceNote: 'Matches your fragrance-free preference.',
  },
  {
    id: '2',
    name: 'Castile Dish Soap Bar',
    safetyLevel: 'clean' as const,
    category: 'Kitchen',
    description: 'Biodegradable, palm-oil-free soap bar in minimal recycled packaging. No synthetic fragrance.',
    imageUrl: 'https://m.media-amazon.com/images/I/81Uoa7-YrKL._SL1500_.jpg',
  },
  {
    id: '3',
    name: 'Dishwasher Pods',
    safetyLevel: 'caution' as const,
    category: 'Home Cleaning',
    description: 'Plant-based cleaning agents but contains methylisothiazolinone in the rinse agent — use with caution.',
    imageUrl: 'https://m.media-amazon.com/images/I/81yQoTrpvRL._AC_SL1500_.jpg',
  },
  {
    id: '4',
    name: 'No Image Product',
    safetyLevel: 'avoid' as const,
    category: 'Kitchen',
    description: 'Example card with no image to show the no-image state.',
  },
]

export default function App() {
  return (
    <div className="min-h-screen bg-linen font-sans p-sp-8">

      {/* Sandbox header */}
      <div className="mb-sp-8 border-b border-dune pb-sp-6">
        <p className="text-micro font-semibold uppercase tracking-widest text-stone">Component Sandbox</p>
        <h1 className="mt-sp-1 text-heading-l font-bold text-charcoal">ProductCard</h1>
        <p className="mt-sp-2 text-body text-stone">Experiment with layout, styling, and states.</p>
      </div>

      {/* Grid of card variants */}
      <div className="grid grid-cols-1 gap-sp-6 sm:grid-cols-2 lg:grid-cols-4">
        {mockProducts.map(product => (
          <ProductCard
            key={product.id}
            name={product.name}
            safetyLevel={product.safetyLevel}
            category={product.category}
            description={product.description}
            imageUrl={product.imageUrl}
            isBestMatch={product.isBestMatch}
            preferenceNote={product.preferenceNote}
            onClick={() => console.log(`Clicked: ${product.name}`)}
          />
        ))}
      </div>
    </div>
  )
}
