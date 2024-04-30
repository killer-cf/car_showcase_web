'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
interface SelectOptionsProps extends React.HTMLAttributes<HTMLDivElement> {
  handleSelectChange: (key: string, value: string) => void
  name: string
  options: {
    key: string
    value: string
  }[]
  placeholder?: string
  defaultValue?: string
}

export function SelectOptions({
  handleSelectChange,
  name,
  defaultValue,
  options,
  placeholder,
  className,
}: SelectOptionsProps) {
  const searchParams = useSearchParams()
  const [value, setValue] = useState(searchParams.get(name) || defaultValue)

  useEffect(() => {
    setValue(searchParams.get(name) || defaultValue)
  }, [searchParams, name, defaultValue])

  return (
    <Select
      onValueChange={(value) => {
        setValue(value)
        handleSelectChange(name, value)
      }}
      value={value || ''}
    >
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.key} value={option.key}>
            {option.value}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
