import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { Webhook } from 'svix'
import { WebhookEvent } from '@clerk/nextjs/server'

import { db } from '@/lib/db'

export async function POST(req: NextRequest) {
  const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!CLERK_WEBHOOK_SECRET) {
    throw new Error('Please add CLERK_WEBHOOK_SECRET from Cleark Dashboard to .env or .env.local')
  }

  // Get the headers
  const headerPayload = headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new NextResponse('Error occures -- no svix headers', { status: 400 })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // Create a new Svix instance with secret
  const wh = new Webhook(CLERK_WEBHOOK_SECRET)

  let evt: WebhookEvent

  // Vefiry the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature
    }) as WebhookEvent
  } catch (error) {
    console.log('Error verifying webhook: ', error)
    return new NextResponse('Error occured', { status: 400 })
  }

  const eventType = evt.type

  if (eventType === 'user.created') {
    await db.user.create({
      data: {
        externalUserId: payload.data.id,
        username: payload.data.username,
        imageUrl: payload.data.image_url,
        stream: {
          create: {
            name: `${payload.data.username}'s stream`
          }
        }
      }
    })
  }

  if (eventType === 'user.updated') {
    await db.user.update({
      where: {
        externalUserId: payload.data.id
      },
      data: {
        username: payload.data.username,
        imageUrl: payload.data.image_url
      }
    })
  }

  if (eventType === 'user.deleted') {
    // await resetIngresses(payload.data.id)

    await db.user.delete({
      where: {
        externalUserId: payload.data.id
      }
    })
  }

  return new Response('', { status: 200 })
}
