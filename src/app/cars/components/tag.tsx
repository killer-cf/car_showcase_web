import { X } from 'lucide-react'

import { Button } from '@/components/ui/button'

interface TagProps {
  title: string
}

export function Tag({ title }: TagProps) {
  return (
    <div className="bg-gray-200 flex justify-center items-center px-2.5 gap-1 rounded-md mr-3 mb-3">
      <Button variant={'blank'} size={'sm'} className="p-0">
        <X className="text-gray-400 h-4 w-4" />
      </Button>
      <span>{title}</span>
    </div>
  )
}
