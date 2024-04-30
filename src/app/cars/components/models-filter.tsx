'use client'

import { useSearchParams } from 'next/navigation'

import { Checkbox } from '@/components/ui/checkbox'

interface ModelsFilterProps {
  handleCheckBoxChange: (key: string, value: string) => void
  options: {
    key: string
    value: string
  }[]
}

export function ModelsFilter({
  handleCheckBoxChange,
  options,
}: ModelsFilterProps) {
  const searchParams = useSearchParams()

  const modelsOnSearchParams = searchParams
    .get('models')
    ?.split(',')
    .filter((model) => model !== '')

  return (
    <>
      {options.map((option) => (
        <div key={option.key} className="flex gap-2">
          <Checkbox
            className="w-5 h-5 mb-2"
            checked={modelsOnSearchParams?.includes(option.key) || false}
            onCheckedChange={(checked) => {
              if (checked) {
                handleCheckBoxChange(
                  'models',
                  modelsOnSearchParams?.concat(option.key).join(',') ||
                    option.key,
                )
              } else {
                handleCheckBoxChange(
                  'models',
                  modelsOnSearchParams
                    ?.filter((model) => model !== option.key)
                    .join(',') || '',
                )
              }
            }}
          />
          <span>{option.value}</span>
        </div>
      ))}
    </>
  )
}
