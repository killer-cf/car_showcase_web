'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { deleteBrand } from '@/actions/brands'
import { ResponseData } from '@/actions/fetch-brands'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'

interface BrandDeleteActionProps {
  id: string
}

export const BrandDeleteAction = ({ id }: BrandDeleteActionProps) => {
  const queryClient = useQueryClient()

  const { mutateAsync: deleteBrandFn, isPending } = useMutation({
    mutationKey: ['brands'],
    mutationFn: async () => deleteBrand({ id }),
    onSuccess(resp) {
      if (resp.data?.success) {
        queryClient.setQueryData(['brands'], (data: ResponseData) => {
          return {
            brands: data.brands.filter((brand) => brand.id !== id),
            meta: data.meta,
          }
        })

        toast.success('Marca excluída com sucesso')
      }

      if (resp.data?.error) {
        toast.error(resp.data?.error)
      }
    },
  })

  async function handleDelete() {
    try {
      await deleteBrandFn()
    } catch (error) {
      toast.error('Erro ao excluir marca')
    }
  }

  return (
    <DropdownMenuItem onClick={handleDelete} disabled={isPending}>
      Excluir
    </DropdownMenuItem>
  )
}
