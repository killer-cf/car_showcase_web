import Link from 'next/link'

import { DataTable } from '@/components/data-table'
import { Button } from '@/components/ui/button'

import { fetchBrands } from '../../data/actions/fetch-brands'
import { brandsColumns } from './components/brands-columns'

export default async function BrandsPage() {
  const data = await fetchBrands()

  return (
    <main className="flex min-h-screen flex-col items-center max-w-6xl m-auto p-5">
      <div>
        <div className="flex my-8 gap-12 justify-between items-center">
          <h1 className="text-3xl font-bold self-start">Marcas</h1>
          <Link href={'/brands/new'}>
            <Button variant={'create'} className="mt-2">
              Nova
            </Button>
          </Link>
        </div>

        <div className="flex gap-4 mt-5">
          <DataTable columns={brandsColumns} data={data.brands} />
        </div>
      </div>
    </main>
  )
}
