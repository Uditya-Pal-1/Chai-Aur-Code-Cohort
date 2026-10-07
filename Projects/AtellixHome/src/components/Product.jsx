export default function ProductComponent({
  html,
  Reveal,
  CATS,
  mobileFiltersOpen,
  setMobileFiltersOpen,
  showAllCategories,
  setShowAllCategories,
  cat,
  setCat,
  q,
  setQ,
  sort,
  setSort,
  visibleProducts,
  list,
  showAllProducts,
  setShowAllProducts,
  setQv,
  wish,
  toggleWish,
  wishlistOnly,
  setWishlistOnly,
  wishlistCount,
  Ic,
  ROOM_IMAGES,
  PAL,
  fmt,
  add,
}) {
  return html`<section id="shop" className="scroll-reveal bg-[#e9e0d2] text-[#342c23] py-24 px-6">
    <div className="max-w-7xl mx-auto">
      <${Reveal} className="collection-intro"
        ><div className="track gold">Made for your everyday</div>
        <h2 className="serif text-5xl font-light mt-3 mb-3">The collection</h2>
        <p className="max-w-xl opacity-65 leading-7 mb-10">
          A considered edit of enduring silhouettes, natural materials, and small details worth
          noticing.
        </p><//
      >
      <div className="collection-tools sticky top-[62px] z-30 -mx-6 px-6 py-4 mb-7">
        <div
          className=${'category-filter-row flex items-center gap-2 mb-4' + (mobileFiltersOpen ? ' mobile-filters-open' : '')}
        >
          <button
            type="button"
            className="mobile-filter-toggle pill"
            aria-expanded=${mobileFiltersOpen}
            aria-controls="collection-category-filters"
            onClick=${() => setMobileFiltersOpen((x) => !x)}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M4 6h16M4 12h16M4 18h16" /></svg
            ><span>Filters</span>
          </button>
          <div
            id="collection-category-filters"
            className="collection-filter-list flex flex-wrap gap-2"
          >
            ${[{ k: 'all', n: 'All' }, ...CATS]
              .slice(0, showAllCategories || mobileFiltersOpen ? CATS.length + 1 : 4)
              .map(
                (c) =>
                  html`<button
                    key=${c.k}
                    className=${'pill ' + (cat === c.k ? 'on' : '')}
                    aria-pressed=${cat === c.k}
                    onClick=${() => {
                      setCat(c.k)
                      setMobileFiltersOpen(false)
                    }}
                  >
                    ${c.n}
                  </button>`,
              )}
          </div>
          <button
            type="button"
            className="filter-toggle pill"
            aria-expanded=${showAllCategories}
            onClick=${() => setShowAllCategories((x) => !x)}
          >
            ${showAllCategories ? 'Less' : 'More'}
          </button>
        </div>
        <div className="flex flex-nowrap gap-2 sm:gap-3">
          <label className="sr-only" htmlFor="collection-search">Search the collection</label
          ><input
            id="collection-search"
            value=${q}
            onInput=${(e) => setQ(e.target.value)}
            placeholder="Search the collection…"
            className="flex-1 min-w-0 bg-white/70 rounded-full px-5 py-3 outline-none text-sm"
          />
          <label className="sr-only" htmlFor="collection-sort">Sort products</label
          ><select
            id="collection-sort"
            value=${sort}
            onChange=${(e) => setSort(e.target.value)}
            className="w-auto shrink-0 bg-white/70 rounded-full px-5 py-3 text-sm outline-none"
          >
            <option value="feat">Featured</option>
            <option value="asc">Price: low to high</option>
            <option value="desc">Price: high to low</option>
          </select>
        </div>
      </div>
      <div className="flex justify-between items-center gap-3 mb-5 text-sm opacity-75">
        <span
          >Showing ${visibleProducts.length} of ${list.length}
          ${list.length === 1 ? 'piece' : 'pieces'}</span
        >
        <div className="flex items-center gap-4">
          <button
            type="button"
            className=${'saved-filter pill ' + (wishlistOnly ? 'on' : '')}
            aria-pressed=${wishlistOnly}
            onClick=${() => setWishlistOnly(!wishlistOnly)}
          >
            <${Ic} n="heart" s=${14} />Saved (${wishlistCount})</button
          >${
            (cat !== 'all' || q) &&
            html`<button
              className="underline underline-offset-4 hover:text-[#806239]"
              onClick=${() => {
                setCat('all')
                setQ('')
              }}
            >
              Clear filters
            </button>`
          }
        </div>
      </div>
      <div className="product-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
        ${visibleProducts.map(
          (p, i) =>
            html`<${Reveal} key=${p.id} delay=${(i % 4) * 0.06}
              ><article
                className="product-card group bg-[#faf7f0] rounded-3xl p-3.5 transition duration-500 hover:-translate-y-1.5"
              >
                <div
                  className="product-photo relative rounded-[1.2rem] aspect-[4/3] overflow-hidden"
                >
                  <button
                    type="button"
                    aria-label=${'Quick view ' + p.n}
                    onClick=${() => setQv(p)}
                    className="product-view-button absolute inset-0 w-full h-full text-white text-left"
                  >
                    <img
                      src=${ROOM_IMAGES[p.k][i % ROOM_IMAGES[p.k].length]}
                      alt=${p.n + ' furniture'}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-center"
                    />
                    <span
                      className="absolute bottom-3 left-3 rounded-full bg-[#24211d]/85 px-4 py-2 text-xs tracking-[.16em] uppercase"
                      >View details <span aria-hidden="true">↗</span></span
                    >
                  </button>
                  <button
                    type="button"
                    aria-label=${wish.includes(p.id) ? 'Remove ' + p.n + ' from saved pieces' : 'Save ' + p.n + ' for later'}
                    title=${wish.includes(p.id) ? 'Remove from saved pieces' : 'Save for later'}
                    aria-pressed=${wish.includes(p.id)}
                    className=${'wishlist-button absolute top-3 right-3 z-10 w-10 h-10 rounded-full flex items-center justify-center shadow-sm transition ' + (wish.includes(p.id) ? 'is-saved' : '')}
                    onClick=${() => toggleWish(p)}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="17"
                      height="17"
                      fill=${wish.includes(p.id) ? 'currentColor' : 'none'}
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path
                        d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 00-7.8 7.8l1 1.1 7.8 7.8 7.8-7.7 1-1.1a5.5 5.5 0 000-7.9z"
                      />
                    </svg>
                  </button>
                </div>
                <div
                  className="product-card-details pt-4 px-1 flex justify-between items-center gap-3"
                >
                  <div className="min-w-0">
                    <div className="track opacity-70 !text-[10px]">${p.cat}</div>
                    <h3 className="product-title serif text-2xl leading-tight mt-1">${p.n}</h3>
                    <div className="mt-1 text-xs opacity-70">${p.m}</div>
                    <div className="mt-1.5 text-base font-medium gold">${fmt(p.p)}</div>
                  </div>
                  <button
                    type="button"
                    aria-label=${'Add ' + p.n + ' to bag'}
                    className="shrink-0 w-10 h-10 rounded-full border border-[#806239]/45 flex items-center justify-center hover:bg-[#d7bd8e] transition"
                    onClick=${() => add(p)}
                  >
                    <${Ic} n="plus" s=${16} />
                  </button>
                </div>
                <div className="flex gap-2 mt-3 px-1">
                  ${p.cols.map((x) => html`<span key=${x} role="img" aria-label=${PAL[x][0] + ' finish'} className="w-4 h-4 rounded-full ring-1 ring-black/10" style=${{ background: PAL[x][1] }} />`)}
                </div>
              </article><//
            >`,
        )}
      </div>
      ${
        list.length === 0 &&
        html`<div className="text-center py-20">
          <div className="serif text-3xl opacity-75">
            ${wishlistOnly ? 'No saved pieces yet' : 'No pieces found'}
          </div>
          <p className="mt-3 opacity-70">
            ${wishlistOnly ? 'Tap the heart on any piece to save it here.' : 'Try a different search or clear your filters.'}
          </p>
          <button
            className="btn f track mt-6"
            onClick=${() => {
              setWishlistOnly(false)
              setCat('all')
              setQ('')
            }}
          >
            ${wishlistOnly ? 'Browse the collection' : 'Show all pieces'}
          </button>
        </div>`
      }
      ${
        list.length > 4 &&
        html`<div className="text-center mt-8">
          <button
            className="btn track"
            aria-expanded=${showAllProducts}
            onClick=${() => setShowAllProducts((x) => !x)}
          >
            ${showAllProducts ? 'Show fewer' : 'View more'}
            <span aria-hidden="true">${showAllProducts ? '↑' : '↓'}</span>
          </button>
        </div>`
      }
    </div>
  </section>`
}
