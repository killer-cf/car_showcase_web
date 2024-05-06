'use client'

import { useEffect } from 'react'

import { updateToken } from '@/data/actions/refresh-token'

interface SessionProviderProps {
  children: React.ReactNode
}

export default function SessionProvider({ children }: SessionProviderProps) {
  // const { clearSession, setSession } = useSessionStore((state) => {
  //   return { clearSession: state.clearSession, setSession: state.setSession }
  // })

  // const router = useRouter()

  useEffect(() => {
    const checkSession = async () => {
      if (session.isLoggedIn && session.expires > Date.now() / 1000) {
        await updateToken(session.refreshToken)
        // router.refresh()
      }
    }

    checkSession()
  }, [session])

  return children
}
