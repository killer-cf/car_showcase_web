import { z } from 'zod'

const BrandSchema = z.object({
  id: z.string(),
  name: z.string(),
  created_at: z.string(),
})

export type Brand = z.infer<typeof BrandSchema>
