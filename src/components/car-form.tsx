'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { ImageInput } from '@/components/image-input'
// import { useRouter } from 'next/navigation'
import { Car } from '@/data/types/car'
import { Brand } from '@/data/types/brand'
import { Model } from '@/data/types/model'
import { Switch } from './ui/switch'
import { api } from '@/data/api'

const createCarFormSchema = z.object({
  name: z.string().min(3, 'Nome é obrigatório, informe no mínimo 3 caracteres'),
  price: z.coerce
    .string()
    .transform((value) => value.replace(/[^0-9]/g, ''))
    .refine((value) => !isNaN(Number(value)), {
      message: 'Preço nao deve conter letras',
    })
    .transform((value) => Number(value)),
  km: z.coerce
    .string()
    .transform((value) => value.replace(/[^0-9]/g, ''))
    .refine((value) => !isNaN(Number(value)), {
      message: 'Quilometragem nao deve conter letras',
    }),
  year: z.coerce.number().positive(),
  used: z.boolean(),
  brand: z.string(),
  model: z.string(),
  images: z.instanceof(File),
})

const editCarFormSchema = createCarFormSchema.omit({
  images: true,
  status: true,
})

type CreateCarForm = z.infer<typeof createCarFormSchema>
type EditCarForm = z.infer<typeof editCarFormSchema>
type CarForm = CreateCarForm & EditCarForm

interface CarFormProps {
  isEditing?: boolean
  car?: Car
}

export function CarForm({ isEditing = false, car }: CarFormProps) {
  const formSchema = isEditing ? editCarFormSchema : createCarFormSchema

  const form = useForm<CarForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: car?.name ?? '',
      price: car?.price ?? 0,
      year: car?.year ?? 2024,
      km: car?.km ?? 0,
      used: car?.used ?? false,
      brand: car?.brand ?? '',
      model: car?.model ?? '',
      images: undefined,
    },
  })

  const [brands, setBrands] = useState<Brand[]>([])
  const [models, setModels] = useState<Model[]>([])
  const selectedBranchId = form.watch('brand')

  // const router = useRouter()

  async function handleCreateCar(data: CarForm) {
    console.log(data)
    // try {
    //   const formData = new FormData()
    //   formData.append('file', data.images)
    //   const response = await api('/images', {
    //     method: 'POST',
    //     body: formData,
    //   })
    //   const responseJson = await response.json()
    //   const responseData = responseJson.data
    //   if (response.ok) {
    //     const car = {
    //       name: data.name,
    //       price: data.price,
    //       description: data.description,
    //       status: data.status,
    //       categoriesIds: data.categoryIds,
    //       optionsGroup: data.optionsGroup,
    //       imageId: responseData.imageId,
    //     }
    //     const carResponse = await fetch('/api/cars', {
    //       method: 'POST',
    //       body: JSON.stringify(car),
    //     })
    //     const carResponseJson = await carResponse.json()
    //     const carResponseData = carResponseJson.data
    //     console.log(carResponseJson)
    //     if (carResponseJson.status === 201) {
    //       toast.success('Produto cadastrado com sucesso!')
    //       form.reset()
    //       setMarkedCategories([])
    //     } else {
    //       toast.error(
    //         `Falha ao processar a requisição! ${carResponseData.message}`,
    //       )
    //     }
    //   } else {
    //     toast.error('Falha ao fazer upload da imagem!')
    //   }
    // } catch (error) {
    //   console.log(error)
    //   toast.error('Falha ao processar a requisição!')
    // }
  }

  async function handleEditCar(data: CarForm) {
    console.log(data)
    // if (!car) return
    // try {
    //   // const formData = new FormData()
    //   // formData.append('file', data.image)
    //   // const response = await fetch('http://localhost:3333/images', {
    //   //   method: 'POST',
    //   //   headers: {
    //   //     Authorization: `Bearer ${session?.data?.access_token}`,
    //   //   },
    //   //   body: formData,
    //   //   cache: 'no-store',
    //   // })
    //   // const responseData = await response.json()
    //   // if (response.ok) {
    //   const editedCar = {
    //     name: data.name,
    //     price: data.price,
    //     description: data.description,
    //     categoriesIds: data.categoryIds,
    //     optionsGroup: data.optionsGroup,
    //     // imageId: responseData.imageId,
    //   }
    //   const carResponse = await fetch(`/api/cars/${car.id}`, {
    //     method: 'PUT',
    //     body: JSON.stringify(editedCar),
    //   })
    //   const carResponseJson = await carResponse.json()
    //   const carResponseData = carResponseJson.data
    //   if (carResponseJson.status === 204) {
    //     form.reset()
    //     router.replace(`/${code}/produto/${car.id}`)
    //     router.refresh()
    //     toast.success('Produto editado com sucesso!')
    //   } else {
    //     toast.error(
    //       `Falha ao processar a requisição! ${carResponseData.message}`,
    //     )
    //   }
    //   // } else {
    //   //   toast.error('Falha ao fazer upload da imagem!')
    //   // }
    // } catch (error) {
    //   console.log(error)
    //   toast.error('Falha ao processar a requisição!')
    // }
  }

  async function onSubmit(data: CarForm) {
    if (isEditing) {
      handleEditCar(data)
    } else {
      handleCreateCar(data)
    }
  }

  useEffect(() => {
    async function fetchBrands() {
      try {
        const response = await api('/api/v1/brands').then((res) => res.json())

        setBrands(response.data)
      } catch (error) {
        toast.error('Falha ao processar a requisição!')
      }
    }

    fetchBrands()
  }, [])

  useEffect(() => {
    selectedBranchId.length === 0 && setModels([])

    async function fetchModels() {
      try {
        const response = await api(
          `/api/v1/brands/${selectedBranchId}/models`,
        ).then((res) => res.json())

        setModels(response.data)
      } catch (error) {
        toast.error('Falha ao processar a requisição!')
      }
    }

    fetchModels()
  }, [selectedBranchId])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 max-w-[500px]"
      >
        {!isEditing && (
          <>
            <FormLabel>Imagens</FormLabel>
            <ImageInput
              onFileSelected={(value) => form.setValue('images', value)}
              isSubmitted={form.formState.isSubmitSuccessful}
            />
            {form.formState.errors.images && (
              <p className="text-sm text-red-900 mt-1">
                {form.formState.errors.images.message}
              </p>
            )}
          </>
        )}

        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titulo</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="price"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preço</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormDescription>
                Preço com duas casas decimais, ex: 10,00
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="year"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ano</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="km"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quilometragem</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="used"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>Carro usado</FormLabel>
                <FormDescription>
                  Receive emails about your account security.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="brand"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Marca</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {brands.map((brand) => (
                    <SelectItem key={brand.id} value={brand.id}>
                      {brand.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="model"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Modelo</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {models?.length > 0 &&
                    models.map((model) => (
                      <SelectItem key={model.id} value={model.id}>
                        {model.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          variant="secondary"
        >
          {isEditing ? 'Editar anuncio' : 'Cadastrar anuncio'}
        </Button>
      </form>
    </Form>
  )
}
