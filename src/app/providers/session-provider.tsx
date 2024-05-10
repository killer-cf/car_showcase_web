'use client'

import { Session } from 'next-auth'
import { SessionProvider as AuthSessionProvider } from 'next-auth/react'

import { SessionMonitor } from '@/utils/session-monitor'

interface SessionProviderProps {
  children: React.ReactNode
  session: Session | null
}

export default function SessionProvider({
  children,
  session,
}: SessionProviderProps) {
  return (
    <AuthSessionProvider session={session}>
      <SessionMonitor />
      {children}
    </AuthSessionProvider>
  )
}
