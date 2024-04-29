'use client'

import { useSearchParams } from 'next/navigation'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { getPrices } from '@/utils/get-prices'

interface PriceFilterProps {
  handleSelectChange: (key: string, value: string) => void
}

export function PriceFilter({ handleSelectChange }: PriceFilterProps) {
  const searchParams = useSearchParams()

  const firstPrice = getPrices()[0].toString()
  const lastPrice = getPrices()[getPrices().length - 1].toString()
  const minPriceOnSearch = searchParams.get('min_price')
  const maxPriceOnSearch = searchParams.get('max_price')
  const minPriceValue = parseInt(minPriceOnSearch || firstPrice, 10)
  const maxPriceValue = parseInt(maxPriceOnSearch || lastPrice, 10)

  const minPrices = getPrices().filter((price) => price < maxPriceValue)
  const maxPrices = getPrices().filter((price) => price > minPriceValue)

  return (
    <div className="flex gap-3">
      <Select
        onValueChange={(value) => handleSelectChange('min_price', value)}
        defaultValue={minPriceOnSearch || 'no-limit'}
      >
        <SelectTrigger className="text-black bg-background">
          <SelectValue placeholder="Min" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem key={'no-limit'} value={'no-limit'}>
            Sem limite
          </SelectItem>
          {minPrices.map((price) => (
            <SelectItem key={price} value={price.toString()}>
              {price.toLocaleString('pt-BR')}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        onValueChange={(value) => handleSelectChange('max_price', value)}
        defaultValue={maxPriceOnSearch || 'no-limit'}
      >
        <SelectTrigger className="text-black bg-background">
          <SelectValue placeholder="Max" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem key={'no-limit'} value={'no-limit'}>
            Sem limite
          </SelectItem>
          {maxPrices.map((price) => (
            <SelectItem key={price} value={price.toString()}>
              {price.toLocaleString('pt-BR')}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
