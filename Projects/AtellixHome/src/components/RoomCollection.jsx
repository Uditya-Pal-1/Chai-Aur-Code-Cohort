export default function RoomCollection({ html, categories, images, Reveal, Icon, onPick }) {
  return html`<section
    className="room-section scroll-reveal bg-[#f4efe6] text-[#342c23] py-24 px-6"
  >
    <div className="max-w-7xl mx-auto">
      <${Reveal}
        ><div className="track gold">Find your feeling</div>
        <h2 className="serif text-5xl font-light mt-3 mb-4">Spaces made for <em>living.</em></h2>
        <p className="max-w-xl opacity-65 leading-7 mb-12">
          Start with a room, a ritual, or a piece you love. Each design is made to feel at home for
          years to come.
        </p><//
      >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[230px]">
        ${categories.map(
          (category, index) =>
            html`<${Reveal}
              key=${category.k}
              delay=${index * 0.07}
              className=${
                index === 0 ? 'col-span-2 row-span-2' : index === 3 ? 'md:col-span-2' : ''
              }
            >
              <button
                type="button"
                aria-label=${'Browse ' + category.n}
                onClick=${() => onPick(category.k)}
                className="group h-full w-full rounded-3xl p-6 relative overflow-hidden cursor-pointer text-left transition duration-500 hover:-translate-y-1 hover:shadow-2xl"
              >
                <img
                  src=${images[category.k][0]}
                  alt=${category.n + ' room inspiration'}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#121212]/70 via-[#121212]/15 to-transparent"
                />
                <div className="relative flex justify-between items-end h-full">
                  <div className="text-[#F7F4EF]">
                    <div className="serif text-2xl md:text-3xl">${category.n}</div>
                    <div className="track opacity-80 mt-1 !text-[10px]">
                      ${category.it.length} designs
                    </div>
                  </div>
                  <span
                    className="w-9 h-9 rounded-full border border-[#F7F4EF]/40 flex items-center justify-center group-hover:bg-[#D4AF37] group-hover:rotate-45 transition duration-500 text-[#F7F4EF]"
                  >
                    <${Icon} n="arrow" s=${15} />
                  </span>
                </div>
              </button>
            <//>`,
        )}
      </div>
    </div>
  </section>`
}
