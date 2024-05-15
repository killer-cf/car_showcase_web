import { auth } from '@/auth'
import { api } from '@/data/api'
import { decrypt } from '@/utils/encryption'

export async function POST(request: Request) {
  const formData = await request.formData()

  const session = await auth()

  if (!session || session.error) {
    return Response.json({ status: 401, error: 'Unauthorized' })
  }

  const accessToken = decrypt(session.access_token ?? '')

  const response = await api('/api/v1/cars', {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((res) => res.json())

  return Response.json({ status: response.status, data: response.data })
}
