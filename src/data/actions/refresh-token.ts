'use server'
import { jwtDecode } from 'jwt-decode'

import { getSession, updateSession } from '@/data/actions/auth'
import { KeycloakToken } from '@/data/types/keycloak-token'
import { env } from '@/env'

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

export async function updateToken(refreshT: string) {
  const session = await getSession()

  const resp = await refreshToken(refreshT)

  if (!resp.access_token) {
    session.destroy()

    return { access_token: null }
  } else {
    const tokenDecoded: KeycloakToken = jwtDecode(resp.access_token)

    await updateSession({
      isLoggedIn: true,
      username: tokenDecoded.name,
      email: tokenDecoded.email,
      accessToken: resp.access_token,
      refreshToken: resp.refresh_token,
      expires: tokenDecoded.exp,
    })
  }
  return { access_token: resp.access_token }
}
