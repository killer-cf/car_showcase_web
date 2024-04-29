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

export function StatusFilter() {
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
    <Select onValueChange={(value) => reloadPage('status', value)}>
      <SelectTrigger className="text-black rounded-none bg-background">
        <SelectValue placeholder="Novo ou usado" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem key={'new'} value={'new'}>
          Novo
        </SelectItem>
        <SelectItem key={'used'} value={'used'}>
          Usado
        </SelectItem>
        <SelectItem key={'new-and-used'} value={'new-and-used'}>
          Novo e usado
        </SelectItem>
      </SelectContent>
    </Select>
  )
}
