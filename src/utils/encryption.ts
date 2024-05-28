import { AES, enc } from 'crypto-js'

import { env } from '@/env'

export function encrypt(text: string) {
  const secretKey = env.APP_SECRET
  const encryptedString = AES.encrypt(text, secretKey).toString()
  return encryptedString
}

export function decrypt(encryptedString: string) {
  const secretKey = env.APP_SECRET
  const bytes = AES.decrypt(encryptedString, secretKey)
  const text = bytes.toString(enc.Utf8)
  return text
}
