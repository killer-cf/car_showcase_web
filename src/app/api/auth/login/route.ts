import { env } from '@/env'

export async function GET() {
  const url = `${env.IDP_SERVER}/protocol/openid-connect/auth?client_id=${env.IDP_CLIENT_ID}&redirect_uri=${env.NEXT_PUBLIC_APP_URL}/api/auth/callback&response_type=code&scope=openid`
  return Response.json({ url })
}
