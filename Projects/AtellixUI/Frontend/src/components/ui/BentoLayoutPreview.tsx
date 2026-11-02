const tiles = [
  { eyebrow: 'FOUNDATION', title: 'A calmer canvas', className: 'is-large' },
  { eyebrow: 'TOKENS', title: 'One source of truth', className: '' },
  { eyebrow: 'MOTION', title: 'Every detail has intent', className: '' },
  { eyebrow: 'COMPONENTS', title: 'Made to compose', className: 'is-wide' },
]

export default function BentoLayoutPreview() {
  return (
    <div className="demo-bento-layout">
      {tiles.map((tile, index) => <article className={`demo-bento-tile ${tile.className}`} key={tile.title}><span>{tile.eyebrow}</span><strong>{tile.title}</strong><i aria-hidden="true">0{index + 1}</i></article>)}
    </div>
  )
}
