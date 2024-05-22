import { User } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

import { Button } from './ui/button'

export async function Auth() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const signOut = async () => {
    'use server'

    const supabase = createClient()
    await supabase.auth.signOut()
    return redirect('/login')
  }

  return user ? (
    <div className="flex items-center">
      <p>
        Olá, <span>{user.email}</span>
      </p>
      <form action={signOut}>
        <Button
          variant="link"
          className="text-md gap-1 text-red-600"
          type="submit"
        >
          Sair
        </Button>
      </form>
    </div>
  ) : (
    <div>
      <Link href="/login">
        <Button variant="link" className="text-md gap-1" type="submit">
          <User className="w-5 h-5" />
          Login
        </Button>
      </Link>
    </div>
  )
}
