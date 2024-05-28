'use server'

import { revalidatePath } from 'next/cache'
import { createSafeActionClient } from 'next-safe-action'
import { z } from 'zod'

import { api } from '@/data/api'
import { getToken } from '@/utils/get-token'

const action = createSafeActionClient()

const deleteSchema = z.object({
  id: z.string(),
})
export const deleteCar = action(deleteSchema, async ({ id }) => {
  try {
    const { accessToken } = await getToken()

    if (!accessToken) return { error: 'Token expired or no session' }

    await api(`/api/v1/cars/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    revalidatePath('/')
    return { success: 'Product deleted' }
  } catch (error) {
    return { error: 'Something went wrong' }
  }
})
