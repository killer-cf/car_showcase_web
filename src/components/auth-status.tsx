'use client'

import { useSession, useSessionStore } from '@/stores/session'
import { useRouter } from 'next/navigation'

export default function AuthStatus() {
  const session = useSession()

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

  if (session.user) {
    return (
      <div className="my-3">
        Logged in as{' '}
        <span className="text-yellow-100">{session.user?.email}</span>{' '}
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
