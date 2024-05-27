import Link from 'next/link'
import { redirect } from 'next/navigation'

import { getAuthenticatedUser } from '@/actions/user'
import { Button } from '@/components/ui/button'
import { defineAbilityFor } from '@/lib/casl'

import { BrandsList } from './components/brand-list'

export default async function BrandsPage() {
  const { success } = await getAuthenticatedUser()

  if (!success) {
    redirect('/')
  }

  const ability = defineAbilityFor(success.user)
  const canCreate = ability.can('create', 'Brand')
  const cannotManager = ability.cannot('manage', 'Brand')

  if (cannotManager) {
    redirect('/')
  }

  return (
    <main className="flex min-h-screen flex-col items-center max-w-6xl m-auto p-5">
      <div className="mb-20">
        <div className="flex my-8 gap-12 justify-between items-center">
          <h1 className="text-3xl font-bold self-start">Marcas</h1>
          {canCreate && (
            <Link href={'/brands/new'}>
              <Button variant={'create'} className="mt-2">
                Nova
              </Button>
            </Link>
          )}
        </div>
        <BrandsList />
      </div>
    </main>
  )
}
