import Link from 'next/link'
import { redirect } from 'next/navigation'

import { DataTable } from '@/components/data-table'
import { Pagination } from '@/components/pagination'
import { Button } from '@/components/ui/button'

import { fetchBrands } from '../../data/actions/fetch-brands'
import { brandsColumns } from './components/brands-columns'

interface BrandsPageProps {
  searchParams: {
    page: number
  }
}

export default async function BrandsPage({ searchParams }: BrandsPageProps) {
  const { brands, meta } = await fetchBrands(searchParams.page)

  if (meta && searchParams.page > meta.total_pages) {
    redirect('/brands')
  }

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

        <div className="flex flex-col gap-4 mt-5">
          <DataTable columns={brandsColumns} data={brands} />
          {meta && (
            <div className="mt-14">
              <Pagination
                currentPage={meta.current_page}
                nextPage={meta.next_page}
                prevPage={meta.prev_page}
                pageLink={'/brands'}
              />
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
