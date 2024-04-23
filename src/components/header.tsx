import { User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import Logo from '../../public/logo_size.jpg'
import { Button } from './ui/button'

export function Header() {
  return (
    <header className="flex items-center bg-background max-w-6xl m-auto">
      <Image src={Logo} width={90} height={90} alt="logo" />
      <nav className="flex gap-3 justify-between w-full">
        <div className="flex gap-3">
          <Button variant="link" className="text-md">
            <Link href={'/'}>Home</Link>
          </Button>
          <Button variant="link" className="text-md">
            <Link href={'/cars'}>Carros a venda</Link>
          </Button>
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
