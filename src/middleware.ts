import { jwtDecode } from 'jwt-decode'
import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

import { env } from '@/env'

import { KeycloakToken } from './data/types/keycloak-token'
import { Session } from './data/types/session'
import { decrypt, encrypt } from './utils/encryption'

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

export default async function middleware(request: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const token = cookies().get('keycloak_access_token')?.value
  const refresh_token = cookies().get('keycloak_refresh_token')?.value

  if (!token || (token === 'undefined' && !refresh_token)) {
    return response
  }

  if (!refresh_token) {
    return response
  }

  const tokenDecrypted = decrypt(token)

  const tokenDecoded = jwtDecode(tokenDecrypted)

  const expires = tokenDecoded.exp ?? 0

  if (expires < Date.now() / 1000) {
    const resp = await refreshToken(refresh_token)

    if (!resp.access_token) {
      response.cookies.delete('keycloak_access_token')
      response.cookies.delete('keycloak_refresh_token')
      response.cookies.delete('keycloak_id_token')
      response.cookies.delete('session')
      return response
    } else {
      response.cookies.set('keycloak_access_token', encrypt(resp.access_token))
      response.cookies.set('keycloak_refresh_token', resp.refresh_token)
      response.cookies.set('keycloak_id_token', encrypt(resp.id_token))

      const tokenDecoded: KeycloakToken = jwtDecode(resp.access_token)

      const session: Session = {
        id: tokenDecoded.sub,
        email: tokenDecoded.email,
        name: tokenDecoded.name,
        expires: tokenDecoded.exp,
      }

      response.cookies.set('session', JSON.stringify(session))
    }
  }

  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
