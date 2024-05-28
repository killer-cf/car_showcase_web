import { z } from 'zod'

export const modelSchema = z.object({
  id: z.string(),
  name: z.string(),
  brand_id: z.string(),
})

export type Model = z.infer<typeof modelSchema>
