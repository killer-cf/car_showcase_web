import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { getSession } from '@/data/actions/auth'
import { env } from '@/env'
import { decrypt } from '@/utils/encryption'

export async function GET() {
  const session = await getSession(false)

  if (session) {
    const idToken = session.idToken

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
      const session = await getSession(false)
      session.destroy()
      revalidatePath('/')
      return new Response(null, { status: 200 })
    } catch (err) {
      console.error(err)
      return new Response(null, { status: 500 })
    }
  }
  return new Response(null, { status: 200 })
}
