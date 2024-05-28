import Image from 'next/image'
import Link from 'next/link'

import { User } from '@/data/types/user'
import { defineAbilityFor } from '@/lib/casl'

import Logo from '../../public/logo_size.jpg'
import { Auth } from './auth'
import { Button } from './ui/button'

interface HeaderProps {
  user?: User
}

export async function Header({ user }: HeaderProps) {
  let canManagerBrands = false
  if (user) {
    const ability = defineAbilityFor(user)
    canManagerBrands = ability.can('manage', 'Brand')
  }

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
          {canManagerBrands && (
            <Button variant="link" className="text-md">
              <Link href={'/brands'}>Marcas</Link>
            </Button>
          )}
        </div>

        <Auth />
      </nav>
    </header>
  )
}
