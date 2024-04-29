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
import { getYears } from '@/utils/get-years'

export function YearFilter() {
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

  const years = getYears()
  const firstYear = years[0]
  const lastYear = years[years.length - 1]
  const minYearOnSearch = searchParams.get('min_year')
  const maxYearOnSearch = searchParams.get('max_year')
  const minYearValue = parseInt(minYearOnSearch || lastYear.toString(), 10)
  const maxYearValue = parseInt(maxYearOnSearch || firstYear.toString(), 10)

  const minYears = years.filter((year) => year < maxYearValue)
  const maxYears = years.filter((year) => year > minYearValue)

  return (
    <div className="flex gap-3">
      <Select onValueChange={(value) => reloadPage('min_year', value)}>
        <SelectTrigger className="text-black bg-background">
          <SelectValue placeholder="Min" />
        </SelectTrigger>
        <SelectContent>
          {minYears.map((year) => (
            <SelectItem key={year} value={year.toString()}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select onValueChange={(value) => reloadPage('max_year', value)}>
        <SelectTrigger className="text-black bg-background">
          <SelectValue placeholder="Max" />
        </SelectTrigger>
        <SelectContent>
          {maxYears.map((year) => (
            <SelectItem key={year} value={year.toString()}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
