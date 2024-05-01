import { api } from '@/data/api'

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const response = await api(`/api/v1/brands/${params.id}/models`).then((res) =>
    res.json(),
  )

  return Response.json(response)
}
