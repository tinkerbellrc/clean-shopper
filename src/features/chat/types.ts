import type { SafetyLevel } from '../../components/ProductCard'

export interface ChatProduct {
  id: string
  name: string
  brand: string
  category: string
  description: string
  safety_level: SafetyLevel
  image_url: string | null
}

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  /** Products surfaced by Supabase search for this assistant turn */
  products?: ChatProduct[]
}
