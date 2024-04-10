import { KeycloakToken } from '@/data/types/keycloak-token'
import { env } from '@/env'
import { User } from '@/stores/session'
import { encrypt } from '@/utils/encryption'
import { jwtDecode } from 'jwt-decode'
import { cookies } from 'next/headers'

async function refreshToken(refreshToken: string) {
  const resp = await fetch(`${env.REFRESH_TOKEN_URL}`, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: env.IDP_CLIENT_ID,
      client_secret: env.IDP_SECRET,
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
    method: 'POST',
  })

  if (resp.ok) {
    return resp.json()
  }

  return resp
}

export async function POST(request: Request) {
  const body = await request.json()

  const resp = await refreshToken(body.refresh_token)

  if (!resp.access_token) {
    cookies().delete('keycloak_access_token')
    cookies().delete('keycloak_refresh_token')
    cookies().delete('keycloak_id_token')
    cookies().delete('session')

    return new Response(null, { status: 204 })
  } else {
    cookies().set('keycloak_access_token', encrypt(resp.access_token))
    cookies().set('keycloak_refresh_token', resp.refresh_token)
    cookies().set('keycloak_id_token', encrypt(resp.id_token))

    const tokenDecoded: KeycloakToken = jwtDecode(resp.access_token)

    const session: User = {
      id: tokenDecoded.sub,
      email: tokenDecoded.email,
      name: tokenDecoded.name,
      expires: tokenDecoded.exp,
    }

    cookies().set('session', JSON.stringify(session))
  }
  return new Response(JSON.stringify({ access_token: resp.access_token }), {
    status: 200,
  })
}
