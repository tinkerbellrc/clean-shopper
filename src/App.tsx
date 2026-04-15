import { ChatPage } from './features/chat'

export default function App() {
  return (
    <div className="flex h-screen flex-col bg-linen font-sans">

      {/* Sandbox header */}
      <div className="border-b border-dune bg-warm-white px-sp-8 py-sp-4 shrink-0">
        <p className="text-micro font-semibold uppercase tracking-widest text-stone">Component Sandbox</p>
        <h1 className="text-heading-s font-bold text-charcoal">ChatPage</h1>
      </div>

      {/* Chat fills remaining height */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <ChatPage />
      </div>

    </div>
  )
}
