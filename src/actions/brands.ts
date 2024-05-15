'use server'

import { revalidateTag } from 'next/cache'
import { z } from 'zod'

import { auth } from '@/auth'
import { api } from '@/data/api'
import { actionClient } from '@/lib/safe-action'
import { decrypt } from '@/utils/encryption'

const deleteSchema = z.object({
  id: z.string(),
})
export const deleteBrand = actionClient(deleteSchema, async ({ id }) => {
  try {
    const session = await auth()

    if (!session || session.error) {
      return { error: 'Token expired or no session' }
    }

    const accessToken = decrypt(session.access_token ?? '')

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
