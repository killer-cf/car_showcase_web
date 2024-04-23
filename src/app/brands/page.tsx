import { DataTable } from '@/components/data-table'

import { fetchBrands } from '../../data/actions/fetch-brands'
import { brandsColumns } from './components/brands-columns'

export default async function BrandsPage() {
  const data = await fetchBrands()

  return (
    <main className="flex min-h-screen flex-col items-center max-w-6xl m-auto">
      <div className="flex my-8 gap-8">
        <h1 className="text-5xl font-bold self-start">Marcas</h1>
      </div>

      <div className="flex gap-4 mt-5">
        <div className="space-y-5">
          <DataTable columns={brandsColumns} data={data.brands} />
        </div>
      </div>
    </main>
  )
}
