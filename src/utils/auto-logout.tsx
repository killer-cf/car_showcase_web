'use client'

import { signOut, useSession } from 'next-auth/react'
import { useEffect } from 'react'

export function AutoLogout() {
  const { data: session } = useSession()
  console.log('ERROR NO AUTO PAGE', session?.error)
  useEffect(() => {
    if (session?.error === 'RefreshAccessTokenError') {
      signOut() // Force sign in to hopefully resolve error
    }
  }, [session])
  return <div></div>
}
