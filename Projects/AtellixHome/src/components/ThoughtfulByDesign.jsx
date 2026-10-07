export default function ThoughtfulByDesignComponent({ html, Reveal, Stat }) {
  return html`<section id="craft" className="scroll-reveal warm-craft text-[#F7F4EF] py-24 px-6">
    <div className="max-w-6xl mx-auto">
      <${Reveal}
        ><div className="track gold">Made slowly. Made to stay.</div>
        <h2 className="serif text-5xl md:text-6xl font-light mt-3 max-w-2xl leading-tight">
          Thoughtful by design.<br /><em className="gold">Made for living.</em>
        </h2>
        <p className="max-w-xl opacity-60 mt-5 leading-8">
          Good furniture should feel right today and still feel right years from now. Every piece
          moves through four careful hands-on stages.
        </p><//
      >
      <div className="grid md:grid-cols-4 gap-6 mt-14">
        ${[
          [
            '01',
            'Design',
            'Every form is drawn by hand in our Milan studio before a single stitch is cut.',
          ],
          [
            '02',
            'Select',
            'Marble, oak and full-grain leather are chosen slab by slab, leaf by leaf.',
          ],
          [
            '03',
            'Craft',
            'One master artisan builds each piece and signs the underside of the frame.',
          ],
          ['04', 'Deliver', 'White-glove delivery, placement and packaging removal — worldwide.'],
        ].map(
          ([n, t, d], i) =>
            html`<${Reveal} key=${n} delay=${i * 0.12}
              ><div className="border-t border-[#D4AF37]/40 pt-5 hover:border-[#D4AF37] transition">
                <div className="serif text-5xl gold opacity-60">${n}</div>
                <div className="serif text-2xl mt-3">${t}</div>
                <p className="text-sm opacity-60 mt-2 leading-7">${d}</p>
              </div><//
            >`,
        )}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
        <${Stat} to=${2300} suf="+" label="Homes furnished" /><${Stat}
          to=${50}
          suf=""
          label="Years of craft"
        /><${Stat} to=${100} suf="%" label="Sustainable sourcing" /><${Stat}
          to=${10}
          suf="y"
          label="Guarantee"
        />
      </div>
    </div>
  </section>`
}
