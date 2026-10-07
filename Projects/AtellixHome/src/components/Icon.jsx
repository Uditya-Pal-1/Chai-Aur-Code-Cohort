const PATHS = {
  search: 'M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.3-4.3',
  bag: 'M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0',
  x: 'M18 6L6 18M6 6l12 12',
  plus: 'M12 5v14M5 12h14',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  heart:
    'M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 00-7.8 7.8l1 1.1 7.8 7.8 7.8-7.7 1-1.1a5.5 5.5 0 000-7.9z',
  star: 'M12 2l3 7 7 .6-5.3 4.7L18.2 22 12 18l-6.2 4 1.5-7.7L2 9.6 9 9z',
  truck:
    'M1 3h15v13H1zM16 8h4l3 3v5h-7zM5.5 21a2 2 0 100-4 2 2 0 000 4zM18.5 21a2 2 0 100-4 2 2 0 000 4z',
  shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  minus: 'M5 12h14',
}

export default function Icon({ html, n, s = 18 }) {
  return html`<svg
    width=${s}
    height=${s}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d=${PATHS[n]} />
  </svg>`
}
