import { z } from 'zod'

import { carSchema } from '@/data/types/car'

export const carSubject = z.tuple([
  z.union([
    z.literal('manage'),
    z.literal('create'),
    z.literal('delete'),
    z.literal('get'),
  ]),
  z.union([z.literal('Car'), carSchema]),
])

export type CarSubject = z.infer<typeof carSubject>
