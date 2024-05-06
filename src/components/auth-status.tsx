'use client'

import { IronSession } from 'iron-session'
import { useRouter } from 'next/navigation'

import { SessionData } from '@/lib/iron-session'
import { useSession, useSessionStore } from '@/stores/session'

interface AuthStatusProps {
  session: IronSession<SessionData>
}

export default function AuthStatus({ session }: AuthStatusProps) {
  // const session = useSession()

  console.log('session', session)

  const { logout } = useSessionStore((state) => {
    return { logout: state.logout }
  })

  const router = useRouter()

  async function handleLogin() {
    const res = await fetch('/api/auth/login').then((res) => res.json())
    router.push(res.url)
  }
  async function handleLogout() {
    await logout()
    router.refresh()
  }

  if (session.isLoggedIn) {
    return (
      <div className="my-3">
        Logged in as <span className="text-yellow-100">{session.email}</span>{' '}
        <button
          className="bg-blue-900 font-bold text-white py-1 px-2 rounded border border-gray-50"
          onClick={handleLogout}
        >
          Log out
        </button>
      </div>
    )
  }

  return (
    <div className="my-3">
      Not logged in.{' '}
      <button
        className="bg-blue-900 font-bold text-white py-1 px-2 rounded border border-gray-50"
        onClick={handleLogin}
      >
        Log in
      </button>
    </div>
  )
}
