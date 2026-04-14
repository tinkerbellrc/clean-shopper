// Opens Amazon search tabs for all 20 products.
// Run with: node scripts/open-amazon-searches.mjs

import { exec } from 'child_process'

const products = [
  // Personal Care
  { brand: 'Ethique', name: 'Fragrance-Free Shampoo Bar' },
  { brand: 'Badger', name: 'Mineral Sunscreen SPF 50' },
  { brand: 'Native', name: 'Aluminum-Free Deodorant' },
  { brand: 'Dr. Bronner', name: 'Unscented Castile Liquid Soap' },
  { brand: 'Trilogy', name: 'Rosehip Facial Oil' },
  { brand: 'Hello', name: 'Bamboo Charcoal Toothpaste' },

  // Home Cleaning
  { brand: 'Branch Basics', name: 'All-Purpose Cleaning Spray' },
  { brand: "Molly's Suds", name: 'Oxygen Brightener Powder' },
  { brand: 'Seventh Generation', name: 'Dishwasher Pods' },
  { brand: 'Better Life', name: 'Glass & Surface Cleaner' },
  { brand: 'Friendsheep', name: 'Wool Dryer Balls' },
  { brand: 'Ecover', name: 'Toilet Bowl Cleaner' },

  // Baby Care
  { brand: "Burt's Bees Baby", name: 'Fragrance-Free Baby Wash' },
  { brand: 'Earth Mama', name: 'Organic Diaper Rash Cream' },
  { brand: 'Dreft Pure Gentleness', name: 'Unscented Baby Laundry Detergent' },
  { brand: 'Honest Company', name: 'Natural Baby Powder' },

  // Kitchen
  { brand: 'Dr. Bronner', name: 'Castile Dish Soap Bar' },
  { brand: 'Blueland', name: 'Dish Soap Concentrate' },
  { brand: "Bee's Wrap", name: 'Beeswax Food Wraps' },
  { brand: 'Twist', name: 'Compostable Sponges' },
]

const urls = products.map(({ brand, name }) => {
  const query = encodeURIComponent(`${brand} ${name}`)
  return `https://www.amazon.com/s?k=${query}`
})

console.log(`Opening ${urls.length} Amazon search tabs...\n`)
urls.forEach((url, i) => {
  console.log(`${i + 1}. ${products[i].brand} — ${products[i].name}`)
  setTimeout(() => exec(`open "${url}"`), i * 300)
})

console.log('\nFor each tab: find the right listing, click into the product page,')
console.log('right-click the main image → Copy Image Address, and save the URL.')
