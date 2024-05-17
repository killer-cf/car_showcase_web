import { z } from 'zod'

export const modelSubject = z.tuple([
  z.union([
    z.literal('manage'),
    z.literal('create'),
    z.literal('delete'),
    z.literal('list'),
  ]),
  z.literal('Model'),
])

export type ModelSubject = z.infer<typeof modelSubject>
