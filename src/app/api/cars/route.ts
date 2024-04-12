import { getAccessToken } from '@/data/actions/get-access-token'
import { api } from '@/data/api'

export async function POST(request: Request) {
  const formData = await request.formData()

  const accessToken = await getAccessToken()

  if (!accessToken) {
    return Response.json({ status: 401 })
  }

  const response = await api('/api/v1/cars', {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((res) => res.json())

  return Response.json({ status: response.status })
}
