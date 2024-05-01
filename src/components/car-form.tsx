'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

import { ImageInput } from '@/components/image-input'
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
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Car } from '@/data/types/car'
import { useFetchBrandModels } from '@/data/uses/use-fetch-brand-models'
import { useFetchBrands } from '@/data/uses/use-fetch-brands'

import { Switch } from './ui/switch'

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
    })
    .transform((value) => Number(value)),
  year: z.coerce.number().positive(),
  used: z.boolean(),
  brand: z.string(),
  model: z.string(),
  images: z.array(z.instanceof(File)),
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

  async function handleCreateCar(data: CarForm) {
    try {
      const formData = new FormData()

      for (let i = 0; i < data.images.length; i++) {
        formData.append(`car[images][]`, data.images[i])
      }

      formData.append('car[name]', data.name)
      formData.append('car[price]', String(data.price))
      formData.append('car[year]', String(data.year))
      formData.append('car[km]', String(data.km))
      formData.append('car[used]', String(data.used))
      formData.append('car[brand_id]', data.brand)
      formData.append('car[model_id]', data.model)

      const response = await fetch('/api/cars', {
        method: 'POST',
        body: formData,
      }).then((res) => res.json())

      if (response.status === 201) {
        form.reset()
        toast.success('Produto cadastrado com sucesso!')
      } else if (response.status === 500) {
        toast.error(`Erro de servidor`)
      } else if (response.status === 422) {
        console.log(response)
        // form.setError()
      }
    } catch (error) {
      console.log(error)
      toast.error('Falha ao processar a requisição!')
    }
  }

  async function handleEditCar(data: CarForm) {
    console.log(data)
  }

  async function onSubmit(data: CarForm) {
    if (isEditing) {
      handleEditCar(data)
    } else {
      handleCreateCar(data)
    }
  }

  const { data } = useFetchBrands()
  const brands = data?.brands
  const selectedBrandId = form.watch('brand')

  const { data: modelData } = useFetchBrandModels(selectedBrandId)
  const models = modelData?.models

  return (
    <div className="flex justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 w-[600px] p-16 rounded-xl"
        >
          {!isEditing && (
            <>
              <FormLabel className="text-lg">Imagens</FormLabel>
              <ImageInput
                onFileSelected={(value) => form.setValue('images', value)}
                isSubmitted={form.formState.isSubmitSuccessful}
                limit={5}
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
                <FormLabel className="text-lg">Titulo</FormLabel>
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
                <FormLabel className="text-lg">Preço</FormLabel>
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
                <FormLabel className="text-lg">Ano</FormLabel>
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
                <FormLabel className="text-lg">Quilometragem</FormLabel>
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
                  <FormLabel className="text-lg">Carro usado</FormLabel>
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
                <FormLabel className="text-lg">Marca</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {brands &&
                      brands?.length > 0 &&
                      brands.map((brand) => (
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
                <FormLabel className="text-lg">Modelo</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {models &&
                      models?.length > 0 &&
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
            variant="default"
          >
            {isEditing ? 'Editar anuncio' : 'Cadastrar anuncio'}
          </Button>
        </form>
      </Form>
    </div>
  )
}
