// 'use server'

import { jwtDecode } from 'jwt-decode'
import { cookies } from 'next/headers'

import { decrypt } from '@/utils/encryption'

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

  console.log('Token decrypted get at ', tokenDecrypted)

  const tokenDecoded = jwtDecode(tokenDecrypted)

  const expires = tokenDecoded.exp ?? 0

  if (expires < Date.now() / 1000) {
    return null
  }

  return decrypt(token)
}
