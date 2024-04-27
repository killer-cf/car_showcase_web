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
import { getKms } from '@/utils/get-kms'

export default function KmFilter() {
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

  function reloadPage(value: string) {
    router.push(pathname + '?' + createQueryString('km', value), {
      scroll: false,
    })
  }

  return (
    <div className="px-4 py-6 border-b-2">
      <p className="mb-4">Quilometragem</p>
      <Select onValueChange={(value) => reloadPage(value)}>
        <SelectTrigger className="text-black bg-background">
          <SelectValue placeholder="Qualquer" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem key={'qualquer'} value={'qualquer'}>
            Qualquer
          </SelectItem>
          {getKms().map((km) => (
            <SelectItem key={km} value={km.toString()}>
              {km.toLocaleString('pt-BR')} ou menor
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
