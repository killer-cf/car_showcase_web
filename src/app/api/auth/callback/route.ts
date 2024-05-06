import { jwtDecode } from 'jwt-decode'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

import { getSession } from '@/data/actions/auth'
import { KeycloakToken } from '@/data/types/keycloak-token'
import { env } from '@/env'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)

  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const tokenResponse = await fetch(env.REFRESH_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: env.IDP_CLIENT_ID,
        client_secret: env.IDP_SECRET,
        redirect_uri: `${env.NEXT_PUBLIC_APP_URL}/api/auth/callback`,
        code,
      }),
    })

    const token = await tokenResponse.json()

    const session = await getSession()
    const tokenDecoded: KeycloakToken = jwtDecode(token.access_token)

    session.username = token.username ?? ''
    session.email = tokenDecoded.email
    session.username = tokenDecoded.name
    session.isLoggedIn = true
    session.accessToken = token.access_token
    session.refreshToken = token.refresh_token
    session.idToken = token.id_token
    session.expires = tokenDecoded.exp
    await session.save()
    revalidatePath('/')

    // cookies().set('keycloak_access_token', encrypt(token.access_token))
    // cookies().set('keycloak_refresh_token', token.refresh_token)
    // cookies().set('keycloak_id_token', encrypt(token.id_token))

    // const session: Session = {
    //   id: tokenDecoded.sub,
    //   email: tokenDecoded.email,
    //   name: tokenDecoded.name,
    //   expires: tokenDecoded.exp,
    // }

    // cookies().set('session', JSON.stringify(session))

    return NextResponse.redirect(`${origin}${next}`)
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
