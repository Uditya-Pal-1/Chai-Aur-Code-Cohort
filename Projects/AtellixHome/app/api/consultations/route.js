import { NextResponse } from 'next/server'
import { getDatabase } from '../../../src/server/database.js'
import { parseConsultationRequest, RequestValidationError } from '../../../src/server/requests.js'

export const runtime = 'nodejs'

export async function POST(request) {
  if (
    process.env.STORE_LEADS_ENABLED !== 'true' ||
    process.env.STORE_PRIVACY_NOTICE_VERIFIED !== 'true'
  ) {
    return NextResponse.json(
      { error: 'Consultation requests are not enabled yet. Please contact the showroom.' },
      { status: 503 },
    )
  }

  let payload
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'The request body must be valid JSON.' }, { status: 400 })
  }

  let consultation
  try {
    consultation = parseConsultationRequest(payload)
  } catch (error) {
    if (error instanceof RequestValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    throw error
  }

  try {
    const database = await getDatabase()
    await database.collection('consultations').insertOne({
      ...consultation,
      createdAt: new Date(),
    })
  } catch (error) {
    console.error(
      'Unable to persist the consultation request.',
      error instanceof Error ? error.name : 'Unknown error',
    )
    return NextResponse.json(
      { error: 'We could not save your consultation request. Please try again later.' },
      { status: 503 },
    )
  }

  return NextResponse.json({ message: 'Your consultation request was recorded.' }, { status: 201 })
}
