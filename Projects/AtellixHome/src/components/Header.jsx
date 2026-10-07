export default function HeaderComponent({
  html,
  Ic,
  sc,
  pick,
  go,
  theme,
  setTheme,
  count,
  setOpen,
}) {
  return html`<header
    className=${'site-header fixed top-0 inset-x-0 z-50 ' + (sc ? 'glass' : '')}
    style=${{ paddingTop: 'calc(env(safe-area-inset-top,0px) + ' + (sc ? '12px' : '22px') + ')', paddingBottom: sc ? 12 : 22 }}
  >
    <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
      <button
        type="button"
        aria-label="AtellixHome home"
        className="brand-mark flex items-center cursor-pointer rounded-full focus-visible:outline-none"
        onClick=${() => scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <img
          src="/Assets/logo/logo.png"
          alt="AtellixHome"
          decoding="async"
          className="h-12 w-12 rounded-full object-cover"
        />
      </button>
      <nav aria-label="Main navigation" className="hidden lg:flex gap-8 track">
        ${[
          ['Sofas', 'sofa'],
          ['Tables', 'dtable'],
          ['Chairs', 'chair'],
          ['Counter', 'counter'],
        ].map(
          ([l, k]) =>
            html`<a
              key=${l}
              href="#shop"
              className="cursor-pointer hover:text-[#D4AF37] transition"
              onClick=${(e) => {
                e.preventDefault()
                pick(k)
              }}
              >${l}</a
            >`,
        )}<a
          href="#craft"
          className="cursor-pointer hover:text-[#D4AF37]"
          onClick=${(e) => {
            e.preventDefault()
            go('craft')
          }}
          >Craft</a
        >
      </nav>
      <div className="header-actions flex items-center gap-3 md:gap-5">
        <button
          type="button"
          className="theme-switch w-9 h-9 rounded-full border border-[#aa8957]/50 flex items-center justify-center transition header-icon-button"
          aria-label=${theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
          aria-pressed=${theme === 'dark'}
          title=${theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
          onClick=${() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
        >
          <span aria-hidden="true" className="text-lg leading-none"
            >${theme === 'light' ? '☾' : '☼'}</span
          ></button
        ><button
          type="button"
          className="header-icon-button"
          aria-label="Search collection"
          onClick=${() => go('shop')}
        >
          <${Ic} n="search" />
        </button>
        <button
          type="button"
          aria-label=${'Open shopping bag' + (count ? `, ${count} items` : '')}
          className="header-icon-button relative"
          onClick=${() => setOpen(true)}
        >
          <${Ic}
            n="bag"
          />${count > 0 && html`<span className="absolute -top-2 -right-2 bg-[#D4AF37] text-[#121212] text-[10px] w-4 h-4 rounded-full flex items-center justify-center">${count}</span>`}
        </button>
        <button
          type="button"
          className="btn header-cta hidden md:block track !py-2.5 !px-5"
          onClick=${() => go('visit')}
        >
          Book Consultation
        </button>
      </div>
    </div>
  </header>`
}
