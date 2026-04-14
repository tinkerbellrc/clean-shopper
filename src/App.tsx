import { useState } from 'react'
import { NavBar, type NavView } from './components/NavBar'
import { BrowsePage } from './features/browse'
import { SearchPage } from './features/search'

function App() {
  const [view, setView] = useState<NavView>('browse')

  return (
    <div className="min-h-screen bg-linen font-sans">
      <NavBar activeView={view} onNavigate={setView} />
      {view === 'browse' ? <BrowsePage /> : <SearchPage />}
    </div>
  )
}

export default App
