import { revalidateTag } from 'next/cache'
import { NextRequest } from 'next/server'

import { getSession } from '@/data/actions/auth'
import { updateToken } from '@/data/actions/refresh-token'
import { api } from '@/data/api'

export async function POST(request: NextRequest) {
  const data = await request.json()

  const session = await getSession()

  if (!session.isLoggedIn) {
    return Response.json({ status: 401, error: 'Unauthorized' })
  }

  let accessToken = session.accessToken

  if (session.expires < Date.now() / 1000) {
    const res = await updateToken(session.refreshToken)

    if (!res.access_token) {
      return Response.json({ status: 401, error: 'Unauthorized' })
    }

    accessToken = res.access_token
  }

  const response = await api('/api/v1/brands', {
    method: 'POST',
    body: JSON.stringify({ brand: data }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((res) => res.json())

  if (response.status === 201) {
    revalidateTag('Brands')
  }

  return Response.json({ status: response.status, data: response.data })
}

export async function GET() {
  const response = await api('/api/v1/brands', {
    next: {
      revalidate: 60 * 60 * 24,
    },
  }).then((res) => res.json())

  return Response.json(response)
}
