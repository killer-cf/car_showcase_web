'use server'

import { revalidatePath } from 'next/cache'
import { createSafeActionClient } from 'next-safe-action'
import { z } from 'zod'

import { auth } from '@/auth'
import { api } from '@/data/api'
import { decrypt } from '@/utils/encryption'

const action = createSafeActionClient()

const deleteSchema = z.object({
  id: z.string(),
})
export const deleteCar = action(deleteSchema, async ({ id }) => {
  try {
    const session = await auth()

    if (!session || session.error) {
      return { error: 'Token expired or no session' }
    }

    const accessToken = decrypt(session.access_token ?? '')

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
