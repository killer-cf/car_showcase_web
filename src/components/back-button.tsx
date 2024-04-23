'use client'

import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'

export function BackButton() {
  const router = useRouter()

  async function handleGoBack() {
    router.back()
    router.refresh()
  }

  return (
    <Button onClick={handleGoBack} variant={'link'} className="w-24">
      Voltar
    </Button>
  )
}
