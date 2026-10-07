import React from 'react'

export default function HomeComponent({
  html,
  Words,
  Ic,
  HERO_SOFA_IMAGES,
  go,
  orderInfoOpen,
  setOrderInfoOpen,
}) {
  const [heroIndex, setHeroIndex] = React.useState(0)
  const visualRef = React.useRef(null)
  const pointerFrame = React.useRef(0)
  const pointerPosition = React.useRef([0, 0])
  React.useEffect(() => {
    const i = setInterval(() => setHeroIndex((x) => (x + 1) % HERO_SOFA_IMAGES.length), 10000)
    return () => {
      clearInterval(i)
      cancelAnimationFrame(pointerFrame.current)
    }
  }, [HERO_SOFA_IMAGES.length])
  const moveHero = (e) => {
    pointerPosition.current = [e.clientX / innerWidth - 0.5, e.clientY / innerHeight - 0.5]
    if (pointerFrame.current) return
    pointerFrame.current = requestAnimationFrame(() => {
      const [x, y] = pointerPosition.current
      if (visualRef.current)
        visualRef.current.style.transform = `translate(${x * -16}px,${y * -12}px)`
      pointerFrame.current = 0
    })
  }
  return html`<div>
    <section
      className="hero-section relative min-h-screen flex items-center overflow-hidden pt-28 pb-16"
      onMouseMove=${moveHero}
    >
      <div className="orb w-96 h-96 bg-[#D4AF37] -top-20 -left-20" />
      <div
        className="orb w-80 h-80 bg-[#8a4b24] bottom-0 right-10"
        style=${{ animationDelay: '-6s' }}
      />
      <div
        className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8 lg:gap-10 items-center w-full"
      >
        <div className="hero-copy">
          <div className="track gold flex items-center gap-3" style=${{ animation: 'fi 1s both' }}>
            <span className="w-10 h-px bg-[#AA8957]" />Real Furniture · Real Value
          </div>
          <h1 className="serif font-light text-5xl md:text-6xl xl:text-7xl leading-[1.02] mt-7">
            <${Words} t="A softer place" /><br /><${Words} t="to land." className="gold italic" />
          </h1>
          <p
            className="mt-7 max-w-md opacity-75 leading-8"
            style=${{ animation: 'fi 1s .8s both' }}
          >
            Sink into considered comfort. Thoughtfully made furniture, natural textures, and pieces
            that make home feel like your favourite place to be.
          </p>
          <div
            className="hero-actions mt-10 flex flex-wrap gap-4"
            style=${{ animation: 'fi 1s 1s both' }}
          >
            <button type="button" className="btn f track primary-cta" onClick=${() => go('shop')}>
              Find your favourite
            </button>
            <button type="button" className="btn track secondary-cta" onClick=${() => go('visit')}>
              Come by for a visit
            </button>
          </div>
          <div
            className="hero-benefits mt-12 flex flex-wrap gap-x-8 gap-y-3 opacity-75 text-sm"
            style=${{ animation: 'fi 1s 1.2s both' }}
          >
            ${[
              ['truck', 'Delivered with care'],
              ['shield', 'Made to last'],
            ].map(
              ([i, t], index) =>
                html`<span key=${i + '-' + index} className="flex items-center gap-2"
                  ><${Ic} n=${i} s=${16} />${t}</span
                >`,
            )}
          </div>
          <div className=${'order-info-wrap' + (orderInfoOpen ? ' is-open' : '')}>
            <button
              type="button"
              className="order-info-trigger"
              aria-expanded=${orderInfoOpen}
              aria-controls="order-info-card"
              onClick=${() => setOrderInfoOpen((x) => !x)}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M3 6h12v12H3zM15 10h4l3 3v5h-7z" />
                <circle cx="7.5" cy="18" r="1.5" />
                <circle cx="18.5" cy="18" r="1.5" /></svg
              ><span>Order & delivery</span><span aria-hidden="true">⌄</span>
            </button>
            <div id="order-info-card" className="order-info-card">
              <p>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M4 5h16v14H4zM8 9h8M8 13h5" /></svg
                ><span>Minimum order value <strong>₹1</strong></span>
              </p>
              <p className="mt-3">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M3 6h12v12H3zM15 10h4l3 3v5h-7z" />
                  <circle cx="7.5" cy="18" r="1.5" />
                  <circle cx="18.5" cy="18" r="1.5" /></svg
                ><span>Free shipping above <strong>₹29,999</strong></span>
              </p>
            </div>
          </div>
        </div>
        <div
          ref=${visualRef}
          className="hero-visual relative w-full max-w-[640px] mx-auto flex items-center justify-center py-8"
          style=${{ transition: 'transform .3s' }}
        >
          <div
            className="absolute w-[78%] aspect-square rounded-full"
            style=${{ background: 'radial-gradient(circle,rgba(193,160,112,.16),transparent 68%)', animation: 'drift 16s ease-in-out infinite' }}
          />
          <div
            className="image-card relative w-full aspect-[3/2] overflow-hidden rounded-[2rem] border border-[#D4AF37]/30 shadow-[0_40px_100px_rgba(0,0,0,0.38)]"
            style=${{ animation: 'float 8s ease-in-out infinite' }}
          >
            <img
              key=${heroIndex}
              src=${HERO_SOFA_IMAGES[heroIndex].src}
              alt=${HERO_SOFA_IMAGES[heroIndex].name + ' sofa in a sunlit interior'}
              loading="eager"
              ...${{ fetchPriority: 'high' }}
              decoding="async"
              className="hero-photo w-full h-full object-cover"
            />
            <div
              className="hero-photo-shade absolute inset-0 bg-gradient-to-t from-[#101010]/50 via-transparent to-[#101010]/5 pointer-events-none"
            />
          </div>
          <div
            className="absolute z-[99] top-4 right-0 md:-right-3 glass rounded-2xl px-4 py-3 text-xs"
            style=${{ animation: 'float 6s -2s infinite', border: '1px solid rgba(212,175,55,.3)' }}
          >
            <span className="gold">★★★★★</span> 4.9 · Loved in 2,300 homes
          </div>
          <div
            className="absolute z-[99] bottom-12 left-0 glass rounded-2xl px-4 py-3 text-xs"
            style=${{ animation: 'float 7s -4s infinite', border: '1px solid rgba(212,175,55,.3)' }}
          >
            Featured finish · <span className="gold">${HERO_SOFA_IMAGES[heroIndex].name}</span>
          </div>
          <div
            className="absolute -bottom-1 right-4 flex items-center gap-3 rounded-full bg-[#f8f4ec]/90 backdrop-blur-md px-4 py-3 border border-[#816844]/15 shadow-md"
            aria-label="Choose featured sofa"
          >
            ${HERO_SOFA_IMAGES.map((item, i) => html`<button type="button" key=${item.name + '-' + i} aria-label=${'Show ' + item.name} aria-pressed=${heroIndex === i} title=${item.name} onClick=${() => setHeroIndex(i)} className="w-3 h-3 rounded-full transition-all duration-300" style=${{ background: item.swatch, outline: heroIndex === i ? '2px solid #D4AF37' : '1px solid rgba(255,255,255,.55)', outlineOffset: 3 }} />`)}
          </div>
        </div>
      </div>
    </section>

    <div className="warm-marquee scroll-reveal overflow-hidden border-y border-[#D4AF37]/25 py-5">
      <div
        className="flex w-max gap-14 track whitespace-nowrap opacity-80"
        style=${{ animation: 'marq 34s linear infinite' }}
      >
        ${[0, 1].flatMap((r) => ['Made slowly, for everyday living', 'Soft forms · Honest materials', 'A little more comfort at home', 'Hand-finished in Milan', 'Furniture to settle into', 'Thoughtful from the first stitch'].map((t, index) => html`<span key=${r + '-' + index + '-' + t}>${t} <span className="gold mx-6">✦</span></span>`))}
      </div>
    </div>
  </div>`
}
