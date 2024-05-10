'use client'

import { DataTable } from '@/components/data-table'
import { useFetchBrands } from '@/data/uses/use-fetch-brands'

import { brandsColumns } from './brands-columns'

export function BrandsList() {
  const { data: brandData } = useFetchBrands()
  const brands = brandData?.brands || []

  return (
    <div className="flex flex-col gap-4 mt-5">
      <DataTable columns={brandsColumns} data={brands} />
    </div>
  )
}
