'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

import { SelectOptions } from '@/components/select-options'
import { Button } from '@/components/ui/button'
import { brStates } from '@/utils/br-states'
import { getKms } from '@/utils/get-kms'

import { ModelsFilter } from './models-filter'
import { PriceFilter } from './price-filter'
import { Tag } from './tag'
import { YearFilter } from './year-filter'

export function Filters() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams],
  )

  function updateFilters(key: string, value: string) {
    router.push(pathname + '?' + createQueryString(key, value), {
      scroll: false,
    })
  }

  const brands = [
    { key: 'Tesla', value: 'Tesla' },
    { key: 'BYD', value: 'BYD' },
    { key: 'Ford', value: 'Ford' },
  ]

  const models = [
    { key: 'Model S', value: 'Model S' },
    { key: 'Model 3', value: 'Model 3' },
    { key: 'Model X', value: 'Model X' },
    { key: 'Model Y', value: 'Model Y' },
    { key: 'Cybertruck', value: 'Cybertruck' },
  ]

  const status = [
    { key: 'new', value: 'Novo' },
    { key: 'used', value: 'Usado' },
    { key: 'new-and-used', value: 'Novo e usado' },
  ]

  const modelsOnSearchParams = searchParams
    .get('models')
    ?.split(',')
    .filter((model) => model !== '')
  const brandsOnSearchParams = searchParams.get('brand')

  function clearFilters() {
    router.push(pathname, { scroll: false })
  }

  return (
    <div className="flex flex-col border max-w-[300px]">
      <div className="p-4">
        <div className="flex justify-between items-center">
          <span className="text-lg">132 anúncios</span>
          <Button
            variant="ghost"
            size="sm"
            className="text-lg text-primary"
            onClick={clearFilters}
          >
            Limpar
          </Button>
        </div>
        <div className="flex mt-6 flex-wrap max-w-[300px]">
          {brandsOnSearchParams && <Tag title={brandsOnSearchParams} />}
          {modelsOnSearchParams?.map((model) => (
            <Tag key={model} title={model} />
          ))}
        </div>
      </div>
      <div className="bg-gray-200 px-4 py-6">
        <div className="text-primary flex flex-col">
          <SelectOptions
            name="state"
            className="text-black rounded-none rounded-t-md bg-background"
            handleSelectChange={updateFilters}
            options={brStates}
            placeholder="Estado"
          />
          <SelectOptions
            name="status"
            className="text-black rounded-none bg-background"
            handleSelectChange={updateFilters}
            options={status}
            placeholder="Novo ou usado"
          />
          <SelectOptions
            name="brand"
            className="text-black bg-background rounded-none rounded-b-md"
            handleSelectChange={updateFilters}
            options={brands}
            placeholder="Fabricante"
          />
        </div>
      </div>
      <div className="px-4 py-6 border-b-2">
        <p className="mb-4">Tesla models</p>
        <ModelsFilter handleCheckBoxChange={updateFilters} options={models} />
      </div>

      <div className="px-4 py-6 border-b-2">
        <p className="mb-4">Preço</p>
        <PriceFilter handleSelectChange={updateFilters} />
      </div>

      <div className="px-4 py-6 border-b-2">
        <p className="mb-4">Quilometragem</p>
        <SelectOptions
          name="km"
          className="text-black bg-background"
          handleSelectChange={updateFilters}
          options={getKms()}
          defaultValue="qualquer"
        />
      </div>

      <div className="px-4 py-6 border-b-2">
        <p className="mb-4">Ano</p>
        <YearFilter handleSelectChange={updateFilters} />
      </div>
    </div>
  )
}
