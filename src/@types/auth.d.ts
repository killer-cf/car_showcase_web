import NextAuth, { type DefaultSession } from "next-auth"

declare module "next-auth" {
  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  export interface User {
    id: string
    email: string
    name: string
    emailVerified?: boolean
  }
  /**
   * The shape of the account object returned in the OAuth providers' `account` callback,
   * Usually contains information about the provider being used, like OAuth tokens (`access_token`, etc).
   */
  interface Account {
    access_token: string
    refresh_token: string
    id_token: string
    expires_in: number
    expires_at: number
  }
 
  /**
   * Returned by `useSession`, `auth`, contains information about the active session.
   */
  interface Session {
    error?: string
    user: User & DefaultSession["user"]
    access_token: string
    refresh_token: string
    id_token: string
  }
}
 
// The `JWT` interface can be found in the `next-auth/jwt` submodule
import { JWT } from "next-auth/jwt"
 
declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    id_token: string
    access_token: string
    refresh_token: string
    expires_at: number
    token_decoded: {
      email: string
      email_verified: boolean
      exp: number
      iat: number
      name: string
      sub: string
    }
    error?: string
  }
}