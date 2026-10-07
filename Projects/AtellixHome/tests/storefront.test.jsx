import React from 'react'
import htm from 'htm'
import {
  act,
  cleanup,
  fireEvent,
  render,
  renderHook,
  screen,
  waitFor,
} from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CATS, PRODUCTS } from '../src/data/catalog.js'
import useCart from '../src/hooks/useCart.js'
import useCollection from '../src/hooks/useCollection.js'
import CheckoutForm from '../src/components/CheckoutForm.jsx'
import ContactComponent from '../src/components/Contact.jsx'
import FooterComponent from '../src/components/Footer.jsx'
import LEGAL_CONTENT from '../src/data/legalContent.js'
import useDialogFocus from '../src/hooks/useDialogFocus.js'
import { submitRequest } from '../src/lib/submitRequest.js'
import { getDatabase } from '../src/server/database.js'
import { POST as createOrder } from '../app/api/orders/route.js'
import { POST as createConsultation } from '../app/api/consultations/route.js'
import { POST as subscribeNewsletter } from '../app/api/newsletter/route.js'

vi.mock('../src/server/database.js', () => ({ getDatabase: vi.fn() }))

const html = htm.bind(React.createElement)
const envKeys = [
  'STORE_ORDERS_ENABLED',
  'STORE_CATALOG_VERIFIED',
  'STORE_ORDER_TERMS_VERIFIED',
  'STORE_LEADS_ENABLED',
  'STORE_PRIVACY_NOTICE_VERIFIED',
]
const savedEnvironment = Object.fromEntries(envKeys.map((key) => [key, process.env[key]]))
let database

function makeDatabase() {
  const collections = new Map()
  return {
    collection: vi.fn((name) => {
      if (!collections.has(name)) {
        collections.set(name, {
          createIndex: vi.fn().mockResolvedValue('email_1'),
          insertOne: vi.fn().mockResolvedValue({ acknowledged: true }),
        })
      }
      return collections.get(name)
    }),
  }
}

function post(handler, body) {
  return handler(
    new Request('http://localhost/api/test', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }),
  )
}

afterEach(() => {
  cleanup()
  envKeys.forEach((key) => {
    if (savedEnvironment[key] === undefined) delete process.env[key]
    else process.env[key] = savedEnvironment[key]
  })
  localStorage.clear()
  vi.unstubAllGlobals()
  vi.clearAllMocks()
})

describe('product collection filtering', () => {
  it('filters by category and search, and sorts by price', () => {
    const { result } = renderHook(() => useCollection([]))

    act(() => {
      result.current.updateCategory('sofa')
      result.current.updateQuery('monaco')
    })
    expect(result.current.products.map(({ n }) => n)).toEqual(['Monaco Cloud'])

    act(() => {
      result.current.updateQuery('')
      result.current.updateSort('asc')
    })
    expect(result.current.products[0].p).toBeLessThanOrEqual(result.current.products[1].p)
  })
})

describe('wishlist persistence', () => {
  it('loads saved valid product ids and persists changes', async () => {
    localStorage.setItem('af-wishlist', JSON.stringify(['sofa0', 'unknown']))
    vi.resetModules()
    const { default: useWishlist } = await import('../src/hooks/useWishlist.js')
    const { result } = renderHook(() => useWishlist())

    expect(result.current[0]).toEqual(['sofa0'])
    act(() => result.current[1]((current) => [...current, 'chair0']))
    expect(JSON.parse(localStorage.getItem('af-wishlist'))).toEqual(['sofa0', 'chair0'])
  })
})

describe('modal keyboard focus', () => {
  it('traps tab focus, closes on Escape, and restores the previous focus target', () => {
    const trigger = document.createElement('button')
    document.body.append(trigger)
    trigger.focus()
    const onClose = vi.fn()
    function TestDialog() {
      const dialogRef = useDialogFocus(true, onClose)
      return html`<section role="dialog" ref=${dialogRef} tabIndex="-1">
        <button type="button">First</button>
        <button type="button">Last</button>
      </section>`
    }

    const { unmount } = render(React.createElement(TestDialog))
    const first = screen.getByRole('button', { name: 'First' })
    const last = screen.getByRole('button', { name: 'Last' })

    expect(document.activeElement).toBe(first)
    fireEvent.keyDown(document, { key: 'Tab', shiftKey: true })
    expect(document.activeElement).toBe(last)
    fireEvent.keyDown(document, { key: 'Tab' })
    expect(document.activeElement).toBe(first)
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(onClose).toHaveBeenCalledOnce()

    unmount()
    expect(document.activeElement).toBe(trigger)
    trigger.remove()
  })
})

describe('cart quantity and totals', () => {
  it('updates item quantities, count, totals, and clears the cart', () => {
    const { result } = renderHook(() => useCart(vi.fn()))
    const product = PRODUCTS[0]

    act(() => {
      result.current.add(product)
      result.current.add(product)
    })
    expect(result.current.items[0].q).toBe(2)
    expect(result.current.count).toBe(2)
    expect(result.current.total).toBe(product.p * 2)

    act(() => result.current.removeOne(product.id))
    expect(result.current.items[0].q).toBe(1)
    expect(result.current.totalLabel).toContain(product.p.toLocaleString('en-IN'))

    act(() => result.current.clear())
    expect(result.current.count).toBe(0)
    expect(result.current.total).toBe(0)
  })
})

describe('order submission outcomes', () => {
  const orderPayload = {
    customer: {
      name: 'Aman Pal',
      email: 'aman@example.com',
      phone: '+91 95570 28120',
      address: '1 Main Street',
      city: 'Auraiya',
      state: 'Uttar Pradesh',
      postalCode: '206122',
    },
    items: [{ id: PRODUCTS[0].id, quantity: 2 }],
    consent: true,
  }

  beforeEach(() => {
    process.env.STORE_ORDERS_ENABLED = 'true'
    process.env.STORE_CATALOG_VERIFIED = 'true'
    process.env.STORE_ORDER_TERMS_VERIFIED = 'true'
    database = makeDatabase()
    getDatabase.mockResolvedValue(database)
  })

  it('persists a server-priced unpaid request without claiming payment', async () => {
    const response = await post(createOrder, orderPayload)
    const body = await response.json()

    expect(response.status).toBe(201)
    expect(body.status).toBe('awaiting_payment_setup')
    expect(body.message).toMatch(/unpaid/)
    expect(database.collection('orders').insertOne).toHaveBeenCalledOnce()
    expect(database.collection('orders').insertOne.mock.calls[0][0].subtotalINR).toBe(
      PRODUCTS[0].p * 2,
    )
    expect(database.collection('orders').insertOne.mock.calls[0][0].paymentStatus).toBe(
      'not_configured',
    )
  })

  it('does not accept order requests when the feature is disabled', async () => {
    process.env.STORE_ORDERS_ENABLED = 'false'
    const response = await post(createOrder, orderPayload)

    expect(response.status).toBe(503)
    expect(getDatabase).not.toHaveBeenCalled()
  })

  it('keeps order requests disabled until the catalog and terms are verified', async () => {
    delete process.env.STORE_CATALOG_VERIFIED
    const response = await post(createOrder, orderPayload)

    expect(response.status).toBe(503)
    expect(getDatabase).not.toHaveBeenCalled()
  })

  it('rejects untrusted product ids and missing consent', async () => {
    const unknownProduct = await post(createOrder, {
      ...orderPayload,
      items: [{ id: 'made-up', quantity: 1 }],
    })
    const noConsent = await post(createOrder, { ...orderPayload, consent: false })

    expect(unknownProduct.status).toBe(400)
    expect(noConsent.status).toBe(400)
    expect(getDatabase).not.toHaveBeenCalled()
  })

  it('clears the cart only after the server confirms persistence', async () => {
    const onSuccess = vi.fn()
    const fetchMock = vi
      .fn()
      .mockResolvedValue(new Response(JSON.stringify({ orderId: 'saved-order' }), { status: 201 }))
    vi.stubGlobal('fetch', fetchMock)
    render(
      React.createElement(CheckoutForm, {
        html,
        items: [{ id: PRODUCTS[0].id, q: 1 }],
        onCancel: vi.fn(),
        onSuccess,
      }),
    )

    fireEvent.change(screen.getByLabelText('Full name'), { target: { value: 'Aman Pal' } })
    fireEvent.change(screen.getByLabelText('Email address'), {
      target: { value: 'aman@example.com' },
    })
    fireEvent.change(screen.getByLabelText('Phone number'), { target: { value: '8859530028' } })
    fireEvent.change(screen.getByLabelText('Street address'), {
      target: { value: '1 Main Street' },
    })
    fireEvent.change(screen.getByLabelText('City'), { target: { value: 'Auraiya' } })
    fireEvent.change(screen.getByLabelText('State'), { target: { value: 'Uttar Pradesh' } })
    fireEvent.change(screen.getByLabelText('Postal code'), { target: { value: '206122' } })
    fireEvent.click(screen.getByRole('checkbox'))
    fireEvent.submit(screen.getByRole('form'))

    await waitFor(() => expect(onSuccess).toHaveBeenCalledWith('saved-order'))
    expect(fetchMock).toHaveBeenCalledOnce()
    expect(screen.getByText(/This request is unpaid/)).toBeTruthy()
  })

  it('shows a server error and keeps the cart when order persistence fails', async () => {
    const onSuccess = vi.fn()
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ error: 'Order requests are not enabled yet.' }), {
          status: 503,
        }),
      ),
    )
    render(
      React.createElement(CheckoutForm, {
        html,
        items: [{ id: PRODUCTS[0].id, q: 1 }],
        onCancel: vi.fn(),
        onSuccess,
      }),
    )

    fireEvent.change(screen.getByLabelText('Full name'), { target: { value: 'Aman Pal' } })
    fireEvent.change(screen.getByLabelText('Email address'), {
      target: { value: 'aman@example.com' },
    })
    fireEvent.change(screen.getByLabelText('Phone number'), { target: { value: '8859530028' } })
    fireEvent.change(screen.getByLabelText('Street address'), {
      target: { value: '1 Main Street' },
    })
    fireEvent.change(screen.getByLabelText('City'), { target: { value: 'Auraiya' } })
    fireEvent.change(screen.getByLabelText('State'), { target: { value: 'Uttar Pradesh' } })
    fireEvent.change(screen.getByLabelText('Postal code'), { target: { value: '206122' } })
    fireEvent.click(screen.getByRole('checkbox'))
    fireEvent.submit(screen.getByRole('form'))

    expect((await screen.findByRole('alert')).textContent).toContain(
      'Order requests are not enabled',
    )
    expect(onSuccess).not.toHaveBeenCalled()
  })
})

describe('consultation and newsletter submissions', () => {
  beforeEach(() => {
    process.env.STORE_LEADS_ENABLED = 'true'
    process.env.STORE_PRIVACY_NOTICE_VERIFIED = 'true'
    getDatabase.mockResolvedValue(makeDatabase())
  })

  it('persists consented consultation requests', async () => {
    const response = await post(createConsultation, {
      name: 'Aman Pal',
      email: 'AMAN@example.com',
      city: 'Auraiya',
      consent: true,
    })

    expect(response.status).toBe(201)
    expect(await response.json()).toEqual({ message: 'Your consultation request was recorded.' })
  })

  it('requires explicit newsletter consent and validates emails', async () => {
    const invalidEmail = await post(subscribeNewsletter, {
      email: 'not-an-email',
      consent: true,
    })
    const missingConsent = await post(subscribeNewsletter, {
      email: 'aman@example.com',
      consent: false,
    })

    expect(invalidEmail.status).toBe(400)
    expect(missingConsent.status).toBe(400)
    expect(getDatabase).not.toHaveBeenCalled()
  })

  it('keeps lead submissions disabled until the privacy notice is verified', async () => {
    delete process.env.STORE_PRIVACY_NOTICE_VERIFIED
    const response = await post(createConsultation, {
      name: 'Aman Pal',
      email: 'aman@example.com',
      city: 'Auraiya',
      consent: true,
    })

    expect(response.status).toBe(503)
    expect(getDatabase).not.toHaveBeenCalled()
  })

  it('reports database duplicates for newsletter subscribers', async () => {
    const subscribers = {
      createIndex: vi.fn().mockResolvedValue('email_1'),
      insertOne: vi.fn().mockRejectedValue({ code: 11000 }),
    }
    getDatabase.mockResolvedValue({ collection: () => subscribers })
    const response = await post(subscribeNewsletter, {
      email: 'aman@example.com',
      consent: true,
    })

    expect(response.status).toBe(409)
    expect((await response.json()).error).toMatch(/already subscribed/)
  })

  it('shows consultation success only after the server records the request', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ message: 'Your consultation request was recorded.' }), {
          status: 201,
        }),
      ),
    )
    const say = vi.fn()
    const Reveal = ({ children }) => children
    render(React.createElement(ContactComponent, { html, Reveal, say }))

    fireEvent.change(screen.getByLabelText('Full name'), { target: { value: 'Aman Pal' } })
    fireEvent.change(screen.getByLabelText('Email address'), {
      target: { value: 'aman@example.com' },
    })
    fireEvent.change(screen.getByLabelText('Preferred city'), { target: { value: 'Auraiya' } })
    fireEvent.click(screen.getByRole('checkbox'))
    fireEvent.submit(screen.getByRole('button', { name: 'Request Consultation' }).closest('form'))

    expect((await screen.findByRole('status')).textContent).toContain('request was recorded')
    expect(say).toHaveBeenCalledWith('Consultation request recorded')
  })

  it('shows newsletter unavailability instead of a false signup success', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ error: 'Newsletter signups are not enabled yet.' }), {
          status: 503,
        }),
      ),
    )
    render(
      React.createElement(FooterComponent, {
        html,
        CATS,
        pick: vi.fn(),
        go: vi.fn(),
        setInfo: vi.fn(),
        FOOTER_INFO: LEGAL_CONTENT,
        wish: [],
        say: vi.fn(),
      }),
    )

    fireEvent.change(screen.getByLabelText('Email address'), {
      target: { value: 'aman@example.com' },
    })
    fireEvent.click(screen.getByRole('checkbox'))
    fireEvent.submit(screen.getByRole('button', { name: 'Join' }).closest('form'))

    expect((await screen.findByRole('alert')).textContent).toContain('not enabled yet')
  })
})

describe('shared form request responses', () => {
  it('returns successful response data and exposes server failures', async () => {
    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValueOnce(new Response(JSON.stringify({ message: 'saved' }), { status: 201 }))
        .mockResolvedValueOnce(
          new Response(JSON.stringify({ error: 'Submission is disabled.' }), { status: 503 }),
        ),
    )

    await expect(submitRequest('/api/newsletter', {})).resolves.toEqual({ message: 'saved' })
    await expect(submitRequest('/api/newsletter', {})).rejects.toThrow('Submission is disabled.')
  })
})
