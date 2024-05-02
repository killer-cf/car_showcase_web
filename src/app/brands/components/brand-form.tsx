'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ResponseData } from '@/data/actions/fetch-brands'
import { Brand } from '@/data/types/brand'

const createBrandFormSchema = z.object({
  name: z.string().min(3, 'Nome é obrigatório, informe no mínimo 3 caracteres'),
})

const editBrandFormSchema = createBrandFormSchema

type CreateBrandForm = z.infer<typeof createBrandFormSchema>
type EditBrandForm = z.infer<typeof editBrandFormSchema>
type BrandForm = CreateBrandForm & EditBrandForm

interface BrandFormProps {
  isEditing?: boolean
  brand?: Brand
}

export function BrandForm({ isEditing = false, brand }: BrandFormProps) {
  const queryClient = useQueryClient()
  const formSchema = isEditing ? editBrandFormSchema : createBrandFormSchema

  const form = useForm<BrandForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: brand?.name ?? '',
    },
  })

  async function createBrand(data: BrandForm) {
    const response = await fetch('/api/brands', {
      method: 'POST',
      body: JSON.stringify(data),
    }).then((res) => res.json())

    return response
  }

  const { mutateAsync: createBrandFn } = useMutation({
    mutationKey: ['brands'],
    mutationFn: createBrand,
    onSuccess(response) {
      const newBrand = response.data.brand

      if (!newBrand) {
        return
      }

      queryClient.setQueryData(['brands'], (data: ResponseData) => {
        return {
          brands: [...data.brands, newBrand],
          meta: data.meta,
        }
      })
    },
  })

  async function handleCreateBrand(data: BrandForm) {
    try {
      const response = await createBrandFn(data)
      const keys = response.data.errors ? Object.keys(response.data.errors) : []

      switch (response.status) {
        case 201:
          form.reset()
          toast.success('Marca cadastrado com sucesso!')
          alert('Marca cadastrado com sucesso!')
          break
        case 500:
          toast.error('Erro de servidor')
          break
        case 422:
          for (const key of keys) {
            const error = response.data.errors[key]
            form.setError(key as 'name', { message: `${key} ${error}` })
          }
          break
        case 401:
          toast.error('Não autorizado!')
          break
        case 403:
          toast.error('Você não tem permissão para realizar essa ação!')
          break
        default:
          console.log('Código de status não tratado:', response.status)
      }
    } catch (error) {
      console.log(error)
      toast.error('Falha ao processar a requisição!')
    }
  }

  async function handleEditBrand(data: BrandForm) {
    console.log(data)
  }

  async function onSubmit(data: BrandForm) {
    if (isEditing) {
      handleEditBrand(data)
    } else {
      handleCreateBrand(data)
    }
  }

  return (
    <div className="flex justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 w-[600px] p-16 rounded-xl"
        >
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Nome</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            variant="default"
          >
            {isEditing ? 'Editar' : 'Cadastrar'}
          </Button>
        </form>
      </Form>
    </div>
  )
}
