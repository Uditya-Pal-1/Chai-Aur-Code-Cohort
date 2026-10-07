export default function FurnitureIllustration({ html, t, c, cls = 'w-full' }) {
  const gold = '#D4AF37'
  const shadow = html`<ellipse
    key="shadow"
    cx="100"
    cy="128"
    rx="78"
    ry="5"
    fill="#000"
    opacity=".15"
  />`
  const furniture = {
    sofa: [
      html`<rect
        key="sofa-base"
        x="26"
        y="34"
        width="148"
        height="44"
        rx="14"
        fill=${c}
        opacity=".85"
      />`,
      html`<rect key="sofa-left-arm" x="8" y="58" width="30" height="52" rx="10" fill=${c} />`,
      html`<rect key="sofa-right-arm" x="162" y="58" width="30" height="52" rx="10" fill=${c} />`,
      html`<rect key="sofa-seat" x="32" y="66" width="136" height="36" rx="10" fill=${c} />`,
      html`<path key="sofa-back" d="M100 68v34" stroke="#000" strokeOpacity=".2" />`,
      html`<rect key="sofa-leg-left" x="22" y="110" width="4" height="12" fill=${gold} />`,
      html`<rect key="sofa-leg-right" x="174" y="110" width="4" height="12" fill=${gold} />`,
    ],
    chair: [
      html`<rect
        key="chair-base"
        x="52"
        y="26"
        width="96"
        height="52"
        rx="22"
        fill=${c}
        opacity=".85"
      />`,
      html`<rect key="chair-left-arm" x="40" y="62" width="22" height="46" rx="9" fill=${c} />`,
      html`<rect key="chair-right-arm" x="138" y="62" width="22" height="46" rx="9" fill=${c} />`,
      html`<rect key="chair-seat" x="56" y="70" width="88" height="34" rx="9" fill=${c} />`,
      html`<rect key="chair-leg-left" x="52" y="104" width="3" height="18" fill=${gold} />`,
      html`<rect key="chair-leg-right" x="145" y="104" width="3" height="18" fill=${gold} />`,
    ],
    dtable: [
      html`<rect key="table-top" x="18" y="52" width="164" height="9" rx="3" fill=${c} />`,
      html`<rect key="table-leg-left" x="30" y="61" width="7" height="60" fill=${gold} />`,
      html`<rect key="table-leg-right" x="163" y="61" width="7" height="60" fill=${gold} />`,
      html`<rect key="table-accent" x="30" y="76" width="140" height="3" fill=${c} opacity=".5" />`,
    ],
    dchair: [
      html`<rect
        key="dchair-back"
        x="62"
        y="22"
        width="76"
        height="52"
        rx="8"
        fill=${c}
        opacity=".85"
      />`,
      html`<rect key="dchair-seat" x="58" y="74" width="84" height="14" rx="5" fill=${c} />`,
      html`<rect key="dchair-leg-left" x="62" y="88" width="3" height="34" fill=${gold} />`,
      html`<rect key="dchair-leg-right" x="135" y="88" width="3" height="34" fill=${gold} />`,
    ],
    counter: [
      html`<rect key="counter-top" x="30" y="28" width="140" height="8" rx="3" fill=${c} />`,
      html`<rect key="counter-leg-left" x="42" y="36" width="5" height="86" fill=${gold} />`,
      html`<rect key="counter-leg-right" x="153" y="36" width="5" height="86" fill=${gold} />`,
      html`<rect
        key="counter-panel"
        x="42"
        y="92"
        width="116"
        height="4"
        fill=${c}
        opacity=".6"
      />`,
    ],
    coffee: [
      html`<ellipse key="coffee-top" cx="100" cy="70" rx="68" ry="16" fill=${c} />`,
      html`<rect key="coffee-stem" x="96" y="76" width="8" height="40" fill=${gold} />`,
      html`<ellipse key="coffee-base" cx="100" cy="118" rx="36" ry="5" fill=${gold} />`,
    ],
  }

  return html`<svg viewBox="0 0 200 140" className=${cls}>${shadow}${furniture[t]}</svg>`
}
