import { z } from 'zod'

export const roleSchema = z.union([
  z.literal('SUPER'),
  z.literal('ADMIN'),
  z.literal('USER'),
  z.literal('BILLING'),
])

export type Role = z.infer<typeof roleSchema>
