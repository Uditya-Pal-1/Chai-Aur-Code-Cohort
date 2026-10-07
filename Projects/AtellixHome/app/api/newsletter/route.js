import { NextResponse } from 'next/server'
import { getDatabase } from '../../../src/server/database.js'
import { parseNewsletterRequest, RequestValidationError } from '../../../src/server/requests.js'

export const runtime = 'nodejs'

export async function POST(request) {
  if (
    process.env.STORE_LEADS_ENABLED !== 'true' ||
    process.env.STORE_PRIVACY_NOTICE_VERIFIED !== 'true'
  ) {
    return NextResponse.json(
      { error: 'Newsletter signups are not enabled yet. Please try again later.' },
      { status: 503 },
    )
  }

  let payload
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'The request body must be valid JSON.' }, { status: 400 })
  }

  let signup
  try {
    signup = parseNewsletterRequest(payload)
  } catch (error) {
    if (error instanceof RequestValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    throw error
  }

  try {
    const database = await getDatabase()
    const subscribers = database.collection('newsletter_signups')
    await subscribers.createIndex({ email: 1 }, { unique: true })
    await subscribers.insertOne({ ...signup, createdAt: new Date() })
  } catch (error) {
    if (error && error.code === 11000) {
      return NextResponse.json({ error: 'This email is already subscribed.' }, { status: 409 })
    }
    console.error(
      'Unable to persist the newsletter signup.',
      error instanceof Error ? error.name : 'Unknown error',
    )
    return NextResponse.json(
      { error: 'We could not save your signup. Please try again later.' },
      { status: 503 },
    )
  }

  return NextResponse.json(
    {
      message:
        'Your newsletter signup was recorded. Newsletter email delivery is not connected yet.',
    },
    { status: 201 },
  )
}
