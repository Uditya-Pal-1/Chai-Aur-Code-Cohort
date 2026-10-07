import { randomUUID } from 'node:crypto'
import { NextResponse } from 'next/server'
import { getDatabase } from '../../../src/server/database.js'
import { parseOrderRequest, RequestValidationError } from '../../../src/server/requests.js'

export const runtime = 'nodejs'

export async function POST(request) {
  if (
    process.env.STORE_ORDERS_ENABLED !== 'true' ||
    process.env.STORE_CATALOG_VERIFIED !== 'true' ||
    process.env.STORE_ORDER_TERMS_VERIFIED !== 'true'
  ) {
    return NextResponse.json(
      { error: 'Order requests are not enabled yet. Please contact the showroom.' },
      { status: 503 },
    )
  }

  let payload
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'The request body must be valid JSON.' }, { status: 400 })
  }

  let order
  try {
    order = parseOrderRequest(payload)
  } catch (error) {
    if (error instanceof RequestValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    throw error
  }

  const orderId = randomUUID()
  try {
    const database = await getDatabase()
    await database.collection('orders').insertOne({
      ...order,
      orderId,
      createdAt: new Date(),
    })
  } catch (error) {
    console.error(
      'Unable to persist the order request.',
      error instanceof Error ? error.name : 'Unknown error',
    )
    return NextResponse.json(
      { error: 'We could not save your order request. Please try again later.' },
      { status: 503 },
    )
  }

  return NextResponse.json(
    {
      orderId,
      status: 'awaiting_payment_setup',
      message:
        'Your unpaid order request was recorded. Payment, delivery charges, and final terms are not confirmed yet.',
    },
    { status: 201 },
  )
}
