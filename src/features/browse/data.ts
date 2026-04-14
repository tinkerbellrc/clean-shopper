// Shape returned by the Supabase products table.
export interface DbProduct {
  id: string
  name: string
  brand: string
  category: string
  description: string
  safety_level: 'clean' | 'caution' | 'avoid'
  image_url: string | null
  created_at: string
}
