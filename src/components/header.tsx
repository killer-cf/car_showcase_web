import { User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { getSession } from '@/data/actions/auth'

import Logo from '../../public/logo_size.jpg'
import AuthStatus from './auth-status'
import { Button } from './ui/button'

export async function Header() {
  const session = await getSession()

  return (
    <header className="flex items-center bg-background max-w-6xl m-auto">
      <Image src={Logo} width={70} height={70} alt="logo" />
      <nav className="flex gap-3 justify-between w-full">
        <div className="flex gap-3">
          <Button variant="link" className="text-md">
            <Link href={'/'}>Home</Link>
          </Button>
          <Button variant="link" className="text-md">
            <Link href={'/cars'}>Carros a venda</Link>
          </Button>
          <Button variant="link" className="text-md">
            <Link href={'/brands'}>Marcas</Link>
          </Button>
          <AuthStatus session={session} />
        </div>

        <div>
          <Button variant="link" className="text-md gap-1">
            <User className="w-5 h-5" />
            <Link href={'/login'}>Login</Link>
          </Button>
        </div>
      </nav>
    </header>
  )
}
