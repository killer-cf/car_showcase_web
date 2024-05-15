import { User } from 'lucide-react'

import { auth, signIn, signOut } from '@/auth'

import { Button } from './ui/button'

export async function Auth() {
  const session = await auth()

  if (session && !session.error) {
    return (
      <div className="flex items-center">
        <p>
          Olá, <span>{session.user?.name}</span>
        </p>
        <form
          action={async () => {
            'use server'
            await signOut()
          }}
        >
          <Button
            variant="link"
            className="text-md gap-1 text-red-600"
            type="submit"
          >
            Sair
          </Button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <form
        action={async () => {
          'use server'
          await signIn('keycloak')
        }}
      >
        <Button variant="link" className="text-md gap-1" type="submit">
          <User className="w-5 h-5" />
          Login
        </Button>
      </form>
    </div>
  )
}
