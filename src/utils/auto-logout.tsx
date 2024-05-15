'use client'

import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { useEffect } from 'react'

import { useSession } from '@/data/uses/use-session'

export function AutoLogout() {
  const { data: session, refetch } = useSession()

  const sessionError = session?.error

  const pathName = usePathname()

  useEffect(() => {
    refetch()
  }, [pathName, refetch])

  useEffect(() => {
    if (sessionError === 'RefreshAccessTokenError') {
      signOut()
    }
  }, [sessionError])
  return <div></div>
}
