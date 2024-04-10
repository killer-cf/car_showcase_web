'use client'

import { useSessionStore } from '@/stores/session'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect } from 'react'
import { useCookies } from 'react-cookie'

export default function SessionProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { clearSession, setSession } = useSessionStore((state) => {
    return { clearSession: state.clearSession, setSession: state.setSession }
  })

  const [cookies] = useCookies(['session', 'keycloak_refresh_token'])

  const router = useRouter()

  const refreshSession = useCallback(async () => {
    const res = await fetch('/api/auth/refresh_cookies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refresh_token: cookies.keycloak_refresh_token,
      }),
    })

    if (res.status === 204) {
      clearSession()
    }
  }, [cookies, clearSession])

  useEffect(() => {
    const checkSession = async () => {
      if (cookies.session) {
        if (cookies.session.expires < Date.now() / 1000) {
          console.log('refreshing session on client')
          await refreshSession()
        }
        setSession(cookies.session)
        router.refresh()
      } else {
        console.log('clearing session')
        clearSession()
        router.refresh()
      }
    }

    checkSession()
  }, [cookies, clearSession, setSession, router, refreshSession])

  return <div>{children}</div>
}
