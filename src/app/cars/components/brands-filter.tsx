'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function BrandsFilter() {
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

  function reloadPage(key: string, value: string) {
    router.push(pathname + '?' + createQueryString(key, value), {
      scroll: false,
    })
  }

  return (
    <Select onValueChange={(value) => reloadPage('brand', value)}>
      <SelectTrigger className="text-black rounded-none rounded-b-md bg-background">
        <SelectValue placeholder="Fabricante" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem key={'id-aqui'} value={'id-aqui'}>
          Tesla
        </SelectItem>
        <SelectItem key={'id-aqui-1'} value={'id-aqui-1'}>
          Ford
        </SelectItem>
        <SelectItem key={'id-aqui-2'} value={'id-aqui-2'}>
          Toyota
        </SelectItem>
      </SelectContent>
    </Select>
  )
}
