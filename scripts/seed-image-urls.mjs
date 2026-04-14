// Prerequisites — run this SQL in the Supabase SQL editor first:
//   ALTER TABLE products ADD COLUMN image_url TEXT;
//
// Then run this script from the project root:
//   cd /Users/ruparc/Projects/clean-shopper && node scripts/seed-image-urls.mjs

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://jhsgbrhzoakujwoaobqv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impoc2dicmh6b2FrdWp3b2FvYnF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0Mzg0MDcsImV4cCI6MjA5MTAxNDQwN30.6PaTxjAtfIUU_G0pyprgfUhyh4oxwL4nWU_nabwCCa4'
)

// Keyed by "brand — name" to match seed-safety-levels.mjs convention
// Two products have no Amazon listing — left null for now
const imageUrls = {
  // Personal Care
  'Ethique — Fragrance-Free Shampoo Bar':         'https://m.media-amazon.com/images/I/61gCgx2Y--L._SL1500_.jpg',
  'Badger — Mineral Sunscreen SPF 50':            'https://m.media-amazon.com/images/I/61ElvwyfyeL._SL1500_.jpg',
  'Native — Aluminum-Free Deodorant':             'https://m.media-amazon.com/images/I/61CDk0aPrfL._SL1500_.jpg',
  'Dr. Bronner — Unscented Castile Liquid Soap':  'https://m.media-amazon.com/images/I/71W6dTvROYL._SL1500_.jpg',
  'Trilogy — Rosehip Facial Oil':                 'https://m.media-amazon.com/images/I/61lcjdVXTXL._SL1500_.jpg',
  'Hello — Bamboo Charcoal Toothpaste':           'https://m.media-amazon.com/images/I/71xzV0+bOLL._SL1500_.jpg',

  // Home Cleaning
  'Branch Basics — All-Purpose Cleaning Spray':   'https://m.media-amazon.com/images/I/614ENtEQvOL._AC_SL1500_.jpg',
  "Molly's Suds — Oxygen Brightener Powder":      'https://m.media-amazon.com/images/I/61hSWbfwDfL._AC_SL1080_.jpg',
  'Seventh Generation — Dishwasher Pods':         'https://m.media-amazon.com/images/I/81yQoTrpvRL._AC_SL1500_.jpg',
  'Better Life — Glass & Surface Cleaner':        'https://m.media-amazon.com/images/I/61HIZOV6n9L._AC_SL1500_.jpg',
  'Friendsheep — Wool Dryer Balls':               'https://m.media-amazon.com/images/I/81m8uuu+x-L._AC_SL1500_.jpg',
  'Ecover — Toilet Bowl Cleaner':                 'https://m.media-amazon.com/images/I/71YJ1jFSONL._AC_SL1500_.jpg',

  // Baby Care
  "Burt's Bees Baby — Fragrance-Free Baby Wash":  'https://m.media-amazon.com/images/I/71+7q+cdyWL._SL1500_.jpg',
  'Earth Mama — Organic Diaper Rash Cream':       'https://m.media-amazon.com/images/I/71KzXB188sL._AC_SL1500_.jpg',
  'Dreft Pure Gentleness — Unscented Baby Laundry Detergent': 'https://m.media-amazon.com/images/I/719srC-B2KL._AC_SL1500_.jpg',
  'Honest Company — Natural Baby Powder':         null, // no Amazon listing

  // Kitchen
  'Dr. Bronner — Castile Dish Soap Bar':          'https://m.media-amazon.com/images/I/81Uoa7-YrKL._SL1500_.jpg',
  'Blueland — Dish Soap Concentrate':             'https://m.media-amazon.com/images/I/81iPas+IoBL._AC_SL1500_.jpg',
  "Bee's Wrap — Beeswax Food Wraps":              'https://m.media-amazon.com/images/I/71g8oLa0+OL._AC_SL1500_.jpg',
  'Twist — Compostable Sponges':                  null, // no Amazon listing
}

const { data: products, error: fetchError } = await supabase
  .from('products')
  .select('id, name, brand')

if (fetchError) {
  console.error('Fetch failed:', fetchError.message)
  process.exit(1)
}

let updated = 0
let skipped = 0
let nulled = 0

for (const product of products) {
  const key = `${product.brand} — ${product.name}`
  const url = imageUrls[key]

  if (!(key in imageUrls)) {
    console.warn(`  No mapping found for: "${key}" — skipping`)
    skipped++
    continue
  }

  if (url === null) {
    console.log(`  ⚠ null    ${key} (no listing found)`)
    nulled++
    continue
  }

  const { error } = await supabase
    .from('products')
    .update({ image_url: url })
    .eq('id', product.id)

  if (error) {
    console.error(`  Failed to update "${key}":`, error.message)
  } else {
    console.log(`  ✓ updated  ${key}`)
    updated++
  }
}

console.log(`\nDone — ${updated} updated, ${nulled} skipped (no listing), ${skipped} unmatched.`)
