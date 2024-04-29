'use client'

import { Button } from '@/components/ui/button'

import { BrandsFilter } from './brands-filter'
import KmFilter from './km-filter'
import { ModelsFilter } from './models-filter'
import { PriceFilter } from './price-filter'
import { StateFilter } from './state-filter'
import { StatusFilter } from './status-filter'
import { Tag } from './tag'
import { YearFilter } from './year-filter'

export function Filters() {
  return (
    <div className="flex flex-col border max-w-[300px]">
      <div className="p-4">
        <div className="flex justify-between items-center">
          <span className="text-lg">132 anúncios</span>
          <Button variant="ghost" size="sm" className="text-lg text-primary">
            Limpar
          </Button>
        </div>
        <div className="flex mt-6 flex-wrap max-w-[300px]">
          <Tag title="Tesla" />
          <Tag title="Model S" />
          <Tag title="Cybertruck" />
        </div>
      </div>
      <div className="bg-gray-200 px-4 py-6">
        <div className="text-primary flex flex-col">
          <StateFilter />
          <StatusFilter />
          <BrandsFilter />
        </div>
      </div>
      <div className="px-4 py-6 border-b-2">
        <p className="mb-4">Tesla models</p>
        <ModelsFilter />
      </div>

      <div className="px-4 py-6 border-b-2">
        <p className="mb-4">Preço</p>
        <PriceFilter />
      </div>

      <KmFilter />

      <div className="px-4 py-6 border-b-2">
        <p className="mb-4">Ano</p>
        <YearFilter />
      </div>
    </div>
  )
}
