import React from 'react'
import useDialogFocus from '../hooks/useDialogFocus'
import CheckoutForm from './CheckoutForm'

export default function CartDrawer({
  html,
  panelRef,
  open,
  setOpen,
  items,
  removeOne,
  onOrderComplete,
  totalLabel,
  fmt,
  add,
  PAL,
  Icon,
  FurnitureIllustration,
}) {
  const [checkoutOpen, setCheckoutOpen] = React.useState(false)
  const closeDrawer = () => {
    setCheckoutOpen(false)
    setOpen(false)
  }
  const dialogRef = useDialogFocus(open, closeDrawer)

  return html`<div>
    <div
      aria-hidden="true"
      className=${'fixed inset-0 z-[90] bg-black/60 transition ' + (open ? 'opacity-100' : 'opacity-0 pointer-events-none')}
      onClick=${closeDrawer}
    />
    <aside
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-title"
      aria-hidden=${!open}
      ref=${(element) => {
        dialogRef.current = element
        if (panelRef) panelRef.current = element
      }}
      tabIndex="-1"
      className="cart-panel fixed top-0 right-0 bottom-0 z-[95] w-full max-w-sm bg-[#F7F4EF] text-[#121212] p-7 flex flex-col transition-transform duration-500"
      style=${{ transform: open ? 'none' : 'translateX(100%)' }}
    >
      <div className="flex justify-between items-center">
        <div id="cart-title" className="serif text-3xl">Your Bag</div>
        <button aria-label="Close shopping bag" onClick=${closeDrawer}>
          <${Icon} n="x" />
        </button>
      </div>
      ${
        checkoutOpen &&
        html`<${CheckoutForm}
          html=${html}
          items=${items}
          onCancel=${() => setCheckoutOpen(false)}
          onDone=${closeDrawer}
          onSuccess=${onOrderComplete}
        />`
      }
      ${
        !checkoutOpen &&
        html`<div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto mt-6 space-y-4">
            ${items.length === 0 && html`<div className="opacity-50 mt-10 text-center">Your bag is empty.</div>`}
            ${items.map(
              (item) =>
                html`<div
                  key=${item.id}
                  className="cart-item flex gap-4 items-center bg-[#E5E0D8] rounded-2xl p-3"
                >
                  <div className="w-20">
                    <${FurnitureIllustration} t=${item.k} c=${PAL[item.cols[0]][1]} />
                  </div>
                  <div className="flex-1">
                    <div className="serif text-lg leading-tight">${item.n}</div>
                    <div className="text-sm gold">${fmt(item.p)}</div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <button
                      aria-label=${'Remove one ' + item.n}
                      onClick=${() => removeOne(item.id)}
                    >
                      <${Icon} n="minus" s=${14} />
                    </button>
                    ${item.q}
                    <button aria-label=${'Add one ' + item.n} onClick=${() => add(item)}>
                      <${Icon} n="plus" s=${14} />
                    </button>
                  </div>
                </div>`,
            )}
          </div>
          <div className="border-t border-black/15 pt-5">
            <div className="flex justify-between serif text-2xl mb-4">
              <span>Total</span><span>${totalLabel}</span>
            </div>
            <button
              className="btn f track w-full"
              disabled=${items.length === 0}
              onClick=${() => setCheckoutOpen(true)}
            >
              Checkout
            </button>
          </div>
        </div>`
      }
    </aside>
  </div>`
}
