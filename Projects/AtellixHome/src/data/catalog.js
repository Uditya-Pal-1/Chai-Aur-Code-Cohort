export const PAL = [
  ['Charcoal', '#2b2b30'],
  ['Cognac', '#8a4b24'],
  ['Ivory', '#e6dccb'],
  ['Sage', '#7d8a74'],
  ['Navy', '#26334a'],
  ['Clay', '#b0715a'],
]
export const HERO_SOFA_IMAGES = [
  { src: '/Assets/home/home sofe .webp', name: 'Sage Bouclé', swatch: '#91a69b' },
  { src: '/Assets/home/homeSofa2.webp', name: 'Heritage Leather', swatch: '#63412f' },
  { src: '/Assets/home/homeSofa3.webp', name: 'Soft Grey Linen', swatch: '#92919a' },
  { src: '/Assets/home/homeSofa4.webp', name: 'Everyday Comfort', swatch: '#c7c2b9' },
]
export const ROOM_IMAGES = {
  sofa: [
    '/Assets/optimized/sofa.webp',
    '/Assets/optimized/hal-gatewood-Vfml26Iy4mI-unsplash.webp',
    '/Assets/optimized/ambo-ampeng-KEGGJPKxcSc-unsplash.webp',
  ],
  chair: [
    '/Assets/optimized/pexels-artbovich-6969868.webp',
    '/Assets/optimized/guven-gunes-Iy3GN4iPLW8-unsplash.webp',
    '/Assets/optimized/kevin-shek-kcxZ-YUZ8VE-unsplash.webp',
  ],
  dtable: [
    '/Assets/optimized/spacejoy-GQQyH0yNqLk-unsplash.webp',
    '/Assets/optimized/spacejoy--7QwG_Gu2tg-unsplash.webp',
    '/Assets/optimized/pexels-artbovich-7018400.webp',
  ],
  dchair: [
    '/Assets/optimized/pexels-artbovich-7195532.webp',
    '/Assets/optimized/pexels-artbovich-7535046.webp',
    '/Assets/optimized/pexels-sumeyyebasbil-31921580.webp',
  ],
  counter: [
    '/Assets/optimized/pexels-withoguz-27862551.webp',
    '/Assets/optimized/pexels-artbovich-6758283.webp',
    '/Assets/optimized/pexels-aalsaibaie-12379606.webp',
  ],
  coffee: [
    '/Assets/optimized/pexels-artbovich-6758283.webp',
    '/Assets/optimized/pexels-artbovich-7018400.webp',
    '/Assets/optimized/spacejoy-GQQyH0yNqLk-unsplash.webp',
  ],
}
export const CATS = [
  {
    k: 'sofa',
    n: 'Sofas',
    base: 4200,
    it: [
      'Monaco Cloud',
      'Lido Sectional',
      'Verona Chesterfield',
      'Capri Curve',
      'Atlas Modular',
      'Florence Daybed',
    ],
    m: 'Italian velvet',
  },
  {
    k: 'chair',
    n: 'Armchairs',
    base: 2100,
    it: ['Sculptural Arc', 'Bergère Noir', 'Milano Lounge', 'Oslo Wing', 'Kyoto Low'],
    m: 'Full-grain leather',
  },
  {
    k: 'dtable',
    n: 'Dining Tables',
    base: 5600,
    it: ['Monolith Marble', 'Atelier Oak', 'Obsidian Slab', 'Travertine Oval', 'Palazzo Walnut'],
    m: 'Carrara marble',
  },
  {
    k: 'dchair',
    n: 'Dining Chairs',
    base: 780,
    it: ['Ravello', 'Torino Bouclé', 'Siena Cane', 'Aria Leather', 'Nord Sculpt'],
    m: 'Bouclé & oak',
  },
  {
    k: 'counter',
    n: 'Counter Tables',
    base: 3100,
    it: ['Linea Counter', 'Bar Noir', 'Brass Console', 'Terrazzo Island'],
    m: 'Brushed brass',
  },
  {
    k: 'coffee',
    n: 'Coffee Tables',
    base: 1900,
    it: ['Luna Round', 'Onyx Drum', 'Travertine Pebble', 'Glass Orbit', 'Gilded Arc'],
    m: 'Solid stone',
  },
]
export const PRODUCTS = CATS.flatMap((c) =>
  c.it.map((n, i) => ({
    id: c.k + i,
    k: c.k,
    cat: c.n,
    n,
    m: c.m,
    p: c.base + i * 640,
    cols: [0, 2, 4].map((x) => (x + i) % 6),
  })),
)
export const fmt = (v) => '₹' + v.toLocaleString('en-IN')
