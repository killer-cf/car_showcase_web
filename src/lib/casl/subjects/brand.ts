import { z } from 'zod'

export const brandSubject = z.tuple([
  z.union([z.literal('manage'), z.literal('create'), z.literal('delete')]),
  z.literal('Brand'),
])

export type BrandSubject = z.infer<typeof brandSubject>
