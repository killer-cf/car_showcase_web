import 'server-only'

import { auth } from '@/auth'

import { decrypt } from './encryption'

export async function getToken() {
  const session = await auth()

  if (!session || session.error) {
    return { error: 'Token expired or no session' }
  }

  const accessToken = decrypt(session.access_token ?? '')

  return { accessToken, session }
}
