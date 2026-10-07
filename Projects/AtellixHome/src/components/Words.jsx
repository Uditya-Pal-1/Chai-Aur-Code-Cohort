export default function Words({ html, t, className }) {
  return html`<span className=${className}
    >${t
      .split(' ')
      .map(
        (word, index) =>
          html`<span key=${index} className="inline-block overflow-hidden align-bottom"
            ><span
              className="inline-block"
              style=${{ animation: `fi .9s ${0.1 + index * 0.09}s both` }}
              >${word + '\u00a0'}</span
            ></span
          >`,
      )}</span
  >`
}
