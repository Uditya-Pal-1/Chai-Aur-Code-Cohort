import { useState } from 'react'

export default function CartControlPreview() {
  const [cart, setCart] = useState(0)

  return (
    <div className="demo-product">
      <div>
        <span className="demo-eyebrow">DIGITAL PRODUCT</span>
        <strong>Interface toolkit</strong>
        <span>Component pack · $24</span>
      </div>
      <button className="demo-button demo-button-primary" type="button" onClick={() => setCart((value) => value + 1)}>Add to cart</button>
      <div className="demo-cart-total">Cart <strong>{cart}</strong><span>${(cart * 24).toFixed(2)}</span></div>
    </div>
  )
}
