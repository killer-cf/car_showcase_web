import { SessionOptions } from 'iron-session'

export interface SessionData {
  username: string
  email: string
  accessToken: string
  refreshToken: string
  idToken: string
  isLoggedIn: boolean
  expires: number
}

export const defaultSession: SessionData = {
  username: '',
  email: '',
  accessToken: '',
  refreshToken: '',
  idToken: '',
  isLoggedIn: false,
  expires: 0,
}

export const sessionOptions: SessionOptions = {
  password: 'complex_password_at_least_32_characters_long',
  cookieName: 'iron-examples-app-router-server-component-and-action',
  cookieOptions: {
    // secure only works in `https` environments
    // if your localhost is not on `https`, then use: `secure: process.env.NODE_ENV === "production"`
    secure: process.env.NODE_ENV === 'production',
  },
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
