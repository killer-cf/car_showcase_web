import { revalidateTag } from 'next/cache'

import { getAccessToken } from '@/data/actions/get-access-token'
import { api } from '@/data/api'

export async function POST(request: Request) {
  const data = await request.json()

  console.log(data)

  const accessToken = await getAccessToken()

  if (!accessToken) {
    return Response.json({ status: 401 })
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
