'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

import { SelectOptions } from '@/components/select-options'
import { Button } from '@/components/ui/button'
import { useFetchBrandModels } from '@/hooks/use-fetch-brand-models'
import { useFetchBrands } from '@/hooks/use-fetch-brands'
import { brStates } from '@/utils/br-states'
import { carStatus } from '@/utils/car-status'
import { prices } from '@/utils/get-prices'

export function HomeFilters() {
  const router = useRouter()
  const [searchParams, setSearchParams] = useState(new URLSearchParams())
  const [path, setPath] = useState('/cars')
  const brandOnSearch = searchParams.get('brand')

  const { data: brandData } = useFetchBrands()
  const brands = brandData?.brands
  const brandId = brands?.find((brand) => brand.name === brandOnSearch)?.id

  const { data: modelData } = useFetchBrandModels(brandId)
  const models = modelData?.models

  const brandsForSelect =
    brands?.map((brand) => ({
      key: brand.name,
      value: brand.name,
    })) || []

  const modelsForSelect =
    models?.map((model) => ({
      key: model.name,
      value: model.name,
    })) || []

  const updateQueryString = useCallback(
    (name: string, value: string) => {
      const newSearchParams = new URLSearchParams(searchParams.toString())
      newSearchParams.set(name, value)

      setSearchParams(newSearchParams)
      setPath('/cars?' + newSearchParams.toString())
    },
    [searchParams],
  )

  function pushToCars() {
    router.push(path)
  }

  function handleSelectChange(name: string, value: string) {
    updateQueryString(name, value)
  }

  return (
    <div className="filters mt-4">
      <div className="flex">
        <SelectOptions
          name="status"
          className="text-black rounded-none bg-background"
          handleSelectChange={handleSelectChange}
          options={carStatus}
          placeholder="Novo ou usado"
        />
        <SelectOptions
          name="brand"
          className="text-black bg-background rounded-none"
          handleSelectChange={handleSelectChange}
          options={brandsForSelect}
          placeholder="Fabricante"
        />
        <SelectOptions
          name="models"
          className="text-black bg-background rounded-none"
          handleSelectChange={handleSelectChange}
          options={modelsForSelect}
          placeholder="Modelo"
        />
      </div>

      <div className="grid grid-cols-3">
        <div>
          <SelectOptions
            name="max_price"
            className="text-black rounded-none rounded-t-md bg-background"
            handleSelectChange={handleSelectChange}
            options={prices}
            placeholder="Preço"
          />
        </div>
        <div className="flex">
          <SelectOptions
            name="state"
            className="text-black rounded-none bg-background"
            handleSelectChange={handleSelectChange}
            options={brStates}
            placeholder="Estado"
          />
        </div>

        <Button
          className="h-12 rounded-none bg-violet-700 hover:bg-violet-900 transition-colors ease-in text-lg"
          onClick={pushToCars}
        >
          Buscar
        </Button>
      </div>
    </div>
  )
}
