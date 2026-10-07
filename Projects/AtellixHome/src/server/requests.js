import { PRODUCTS } from '../data/catalog.js'

export class RequestValidationError extends Error {}

function requireText(value, label, maximumLength) {
  if (typeof value !== 'string') {
    throw new RequestValidationError(`${label} is required.`)
  }

  const normalized = value.trim()
  if (!normalized || normalized.length > maximumLength) {
    throw new RequestValidationError(`${label} is invalid.`)
  }

  return normalized
}

function requireEmail(value) {
  const email = requireText(value, 'Email address', 254).toLowerCase()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new RequestValidationError('Enter a valid email address.')
  }
  return email
}

function requireConsent(value) {
  if (value !== true) {
    throw new RequestValidationError('Consent is required to submit this form.')
  }
}

export function parseOrderRequest(payload) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    throw new RequestValidationError('Order details are required.')
  }

  const { customer, items } = payload
  if (!customer || typeof customer !== 'object' || Array.isArray(customer)) {
    throw new RequestValidationError('Customer details are required.')
  }
  requireConsent(payload.consent)

  if (!Array.isArray(items) || items.length === 0 || items.length > 50) {
    throw new RequestValidationError('Select between 1 and 50 products.')
  }

  const quantities = new Map()
  for (const item of items) {
    if (!item || typeof item.id !== 'string' || !Number.isSafeInteger(item.quantity)) {
      throw new RequestValidationError('The order contains an invalid product.')
    }
    const quantity = (quantities.get(item.id) ?? 0) + item.quantity
    if (item.quantity < 1 || quantity > 99) {
      throw new RequestValidationError('Product quantities must be between 1 and 99.')
    }
    quantities.set(item.id, quantity)
  }

  const productsById = new Map(PRODUCTS.map((product) => [product.id, product]))
  const orderItems = [...quantities].map(([id, quantity]) => {
    const product = productsById.get(id)
    if (!product) throw new RequestValidationError('The order contains an unknown product.')
    return {
      productId: product.id,
      name: product.n,
      quantity,
      unitPriceINR: product.p,
      lineTotalINR: product.p * quantity,
    }
  })

  const phone = requireText(customer.phone, 'Phone number', 30)
  if (!/^\+?[0-9().\s-]{7,20}$/.test(phone)) {
    throw new RequestValidationError('Enter a valid phone number.')
  }

  return {
    customer: {
      name: requireText(customer.name, 'Full name', 120),
      email: requireEmail(customer.email),
      phone,
      address: requireText(customer.address, 'Delivery address', 500),
      city: requireText(customer.city, 'City', 100),
      state: requireText(customer.state, 'State', 100),
      postalCode: requireText(customer.postalCode, 'Postal code', 20),
    },
    items: orderItems,
    currency: 'INR',
    subtotalINR: orderItems.reduce((total, item) => total + item.lineTotalINR, 0),
    status: 'awaiting_payment_setup',
    paymentStatus: 'not_configured',
    consentRecorded: true,
  }
}

export function parseConsultationRequest(payload) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    throw new RequestValidationError('Consultation details are required.')
  }
  requireConsent(payload.consent)

  return {
    name: requireText(payload.name, 'Full name', 120),
    email: requireEmail(payload.email),
    city: requireText(payload.city, 'Preferred city', 100),
    status: 'new',
    consentRecorded: true,
  }
}

export function parseNewsletterRequest(payload) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    throw new RequestValidationError('Newsletter details are required.')
  }
  requireConsent(payload.consent)

  return {
    email: requireEmail(payload.email),
    status: 'newsletter_delivery_not_configured',
    consentRecorded: true,
  }
}
