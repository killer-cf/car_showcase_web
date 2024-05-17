import { z } from 'zod'

export const carSchema = z.object({
  __typename: z.literal('Car').default('Car'),
  id: z.string(),
  name: z.string(),
  year: z.number(),
  brand: z.string(),
  model: z.string(),
  price: z.number(),
  km: z.number(),
  used: z.boolean(),
  created_at: z.string(),
  images: z.array(z.object({ id: z.string(), url: z.string() })),
  store_id: z.string(),
})

export type Car = z.infer<typeof carSchema>
