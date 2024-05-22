import { PrismaAdapter } from '@auth/prisma-adapter'
import { jwtDecode } from 'jwt-decode'
import NextAuth from 'next-auth'
import Keycloak from 'next-auth/providers/keycloak'

import { api } from './data/api'
import { env } from './env'
import { prisma } from './lib/prisma'
import { encrypt } from './utils/encryption'

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Keycloak],
  callbacks: {
    async signIn({ account, user }) {
      console.log('signIn', account, user)
      if (account && user) {
        const existingUser = await prisma.user.findFirst({
          where: {
            email: user.email ?? '',
          },
        })

        if (!existingUser) {
          const res = await api(`/api/v1/users`, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${account.access_token}`,
            },
            method: 'POST',
            body: JSON.stringify({
              user: {
                email: user.email,
                name: user.name,
                tax_id: '71318116457',
              },
            }),
          })

          if (!res.ok) {
            console.error('Error creating user', res.status, res.statusText)
            return false
          }
          const { data } = await res.json()

          console.log('data', data)

          if (data.user) {
            await prisma.user.create({
              data: {
                email: data.user.email,
                name: data.user.name,
                image: data.user.avatar?.url ?? '',
                external_id: data.user.id,
                accounts: {
                  create: {
                    provider: account.provider,
                    providerAccountId: account.providerAccountId,
                    access_token: account.access_token,
                    refresh_token: account.refresh_token,
                    id_token: account.id_token,
                    expires_at: account.expires_at,
                    type: 'Bearer',
                  },
                },
              },
            })
          } else {
            const res = await api(`/api/v1/users`, {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${account.access_token}`,
              },
              method: 'GET',
              body: JSON.stringify({
                user: {
                  email: user.email,
                  name: user.name,
                  tax_id: '71318116457',
                },
              }),
            })
          }
        } else {
          await prisma.account.update({
            data: {
              access_token: account.access_token,
              refresh_token: account.refresh_token,
              id_token: account.id_token,
              expires_at: account.expires_at,
            },
            where: {
              provider_providerAccountId: {
                provider: account.provider,
                providerAccountId: account.providerAccountId,
              },
            },
          })
        }

        return true
      }
      return false
    },
    async session({ session, user }) {
      const [keycloakAccount] = await prisma.account.findMany({
        where: { userId: user.id, provider: 'keycloak' },
      })

      console.log({ user })

      const nowTimeStamp = Math.floor(Date.now() / 1000)
      const expires = keycloakAccount.expires_at ?? 0

      if (nowTimeStamp > expires) {
        try {
          const response = await fetch(`${process.env.REFRESH_TOKEN_URL}`, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
              client_id: env.IDP_CLIENT_ID,
              client_secret: env.IDP_SECRET,
              grant_type: 'refresh_token',
              refresh_token: keycloakAccount.refresh_token ?? '',
            }),
            method: 'POST',
          })

          const tokens = await response.json()

          if (!response.ok) throw tokens

          await prisma.account.update({
            data: {
              access_token: tokens.access_token,
              id_token: tokens.id_token,
              expires_at: nowTimeStamp + tokens.expires_in,
              refresh_token:
                tokens.refresh_token ?? keycloakAccount.refresh_token,
            },
            where: {
              provider_providerAccountId: {
                provider: 'keycloak',
                providerAccountId: keycloakAccount.providerAccountId,
              },
            },
          })

          const tokenDecoded = jwtDecode(tokens.access_token)

          session.user = {
            ...session.user,
            id: tokenDecoded.sub ?? '',
          }

          session.access_token = encrypt(tokens.access_token)
          session.id_token = encrypt(tokens.id_token)

          return session
        } catch (error) {
          await prisma.account.update({
            data: {
              access_token: null,
              id_token: null,
              expires_at: null,
              refresh_token: null,
            },
            where: {
              provider_providerAccountId: {
                provider: 'keycloak',
                providerAccountId: keycloakAccount.providerAccountId,
              },
            },
          })

          session.error = 'RefreshAccessTokenError'
        }
      }

      if (keycloakAccount.access_token && keycloakAccount.id_token) {
        const tokenDecoded = jwtDecode(keycloakAccount.access_token)

        session.user = {
          ...session.user,
          id: tokenDecoded.sub ?? '',
        }
        session.access_token = encrypt(keycloakAccount.access_token)
        session.id_token = encrypt(keycloakAccount.id_token)
      }

      return session
    },
  },
})
