import { api } from '@/data/api'
import { getToken } from '@/utils/get-token'

export async function POST(request: Request) {
  const formData = await request.formData()

  const { accessToken } = await getToken()

  if (!accessToken)
    return Response.json({
      status: 401,
      data: { error: 'Token expired or no session' },
    })

  const response = await api('/api/v1/cars', {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((res) => res.json())

  return Response.json({ status: response.status, data: response.data })
}
