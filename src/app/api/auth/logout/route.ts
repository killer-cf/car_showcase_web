import { env } from '@/env'
import { decrypt } from '@/utils/encryption'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET() {
  const accessToken = cookies().get('keycloak_access_token')?.value

  if (accessToken) {
    const idToken = cookies().get('keycloak_id_token')?.value

    if (!idToken) {
      redirect(env.NEXT_PUBLIC_APP_URL)
    }

    const decryptedIdToken = decrypt(idToken)

    const url = `${
      env.END_SESSION_URL
    }?id_token_hint=${decryptedIdToken}&post_logout_redirect_uri=${encodeURIComponent(
      env.NEXT_PUBLIC_APP_URL,
    )}`

    try {
      const resp = await fetch(url, { method: 'GET' })
      if (!resp.ok) {
        throw new Error(`HTTP error! status: ${resp.status}`)
      }
      cookies().delete('keycloak_access_token')
      cookies().delete('keycloak_refresh_token')
      cookies().delete('keycloak_id_token')
      cookies().delete('session')
      return new Response(null, { status: 200 })
    } catch (err) {
      console.error(err)
      return new Response(null, { status: 500 })
    }
  }
  return new Response(null, { status: 200 })
}
