import { jwtDecode } from 'jwt-decode'
import NextAuth from 'next-auth'
import { JWT } from 'next-auth/jwt'
import Keycloak from 'next-auth/providers/keycloak'

import { encrypt } from './utils/encryption'

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Keycloak],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        const createdToken: JWT = {
          token_decoded: jwtDecode(account.access_token),
          id_token: account.id_token,
          access_token: account.access_token,
          expires_at: account.expires_at!,
          refresh_token: account.refresh_token,
        }

        return createdToken
      } else {
        return token
      }
    },
    async session({ session, token }) {
      session.access_token = encrypt(token.access_token)
      session.id_token = encrypt(token.id_token)
      session.error = token.error
      session.user = {
        ...session.user,
        email: token.token_decoded.email,
        name: token.token_decoded.name,
        id: token.token_decoded.sub,
      }

      console.log('session', session.error)

      return session
    },
  },
  session: {
    maxAge: 10,
    updateAge: 0,
  },
})
