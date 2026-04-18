import { useState } from 'react'
import { NavBar, type NavView } from './components/NavBar'
import { BrowsePage } from './features/browse'
import { SearchPage } from './features/search'
import { ChatPage } from './features/chat'

function App() {
  const [view, setView] = useState<NavView>('browse')

  return (
    <div className="min-h-screen bg-linen font-sans flex flex-col">
      <NavBar activeView={view} onNavigate={setView} />
      <main className="flex-1">
        {view === 'browse' && <BrowsePage />}
        {view === 'search' && <SearchPage />}
        {view === 'chat' && <ChatPage />}
      </main>
      <footer className="py-4 text-center text-small text-neutral-400">
        Built with Claude Code
      </footer>
    </div>
  )
}

export default App
