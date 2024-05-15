'use server'

import { revalidateTag } from 'next/cache'
import { z } from 'zod'

import { api } from '@/data/api'
import { actionClient } from '@/lib/safe-action'
import { getToken } from '@/utils/get-token'

const deleteSchema = z.object({
  id: z.string(),
})
export const deleteBrand = actionClient(deleteSchema, async ({ id }) => {
  try {
    const { accessToken } = await getToken()

    if (!accessToken) return { error: 'Token expired or no session' }

    const res = await api(`/api/v1/brands/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!res.ok) {
      return { error: 'Error deleting brand' }
    }

    revalidateTag('Brands')
    return { success: 'Brand deleted' }
  } catch (error) {
    return { error: 'Something went wrong' }
  }
})
