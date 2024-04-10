import { env } from '@/env'

export async function api(path: string, init?: RequestInit) {
  const baseUrl = env.NEXT_PUBLIC_API_BASE_URL
  const url = new URL(path, baseUrl)

  const response = await fetch(url.toString(), init)

  let data = null

  if (response.headers.get('content-type')?.includes('application/json')) {
    data = await response.json()
    return Response.json({
      data,
      status: response.status,
    })
  }

  return Response.json({
    status: response.status,
  })
}
