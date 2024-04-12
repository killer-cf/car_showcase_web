'use server'

import { decrypt } from '@/utils/encryption'
import { jwtDecode } from 'jwt-decode'
import { cookies } from 'next/headers'

export async function getAccessToken(): Promise<string | null> {
  const refresh_token = cookies().get('keycloak_refresh_token')?.value
  const token = cookies().get('keycloak_access_token')?.value

  if (
    !refresh_token ||
    !token ||
    token === 'undefined' ||
    refresh_token === 'undefined'
  ) {
    return null
  }

  const tokenDecrypted = decrypt(token)

  const tokenDecoded = jwtDecode(tokenDecrypted)

  const expires = tokenDecoded.exp ?? 0

  if (expires < Date.now() / 1000) {
    return null
  }

  return decrypt(token)
}
