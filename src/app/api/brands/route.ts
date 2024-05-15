import { revalidateTag } from 'next/cache'
import { NextRequest } from 'next/server'

import { auth } from '@/auth'
import { api } from '@/data/api'
import { decrypt } from '@/utils/encryption'

export async function POST(request: NextRequest) {
  const data = await request.json()

  const session = await auth()

  if (!session || session.error) {
    return Response.json({ status: 401, error: 'Unauthorized' })
  }

  const accessToken = decrypt(session.access_token ?? '')

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
