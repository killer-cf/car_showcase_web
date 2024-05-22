import Image from 'next/image'
import Link from 'next/link'

import { createClient } from '@/utils/supabase/server'

import Logo from '../../public/logo_size.jpg'
import { Auth } from './auth'
import { Button } from './ui/button'

export async function Header() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

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
          {user && (
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
