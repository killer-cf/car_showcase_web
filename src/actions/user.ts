'use server'

import { api } from '@/data/api'
import { User } from '@/data/types/user'
import { createClient } from '@/utils/supabase/server'

interface AuthenticatedUserActionResponse {
  error?: string
  success?: {
    user: User
  }
}

export async function getAuthenticatedUser(): Promise<AuthenticatedUserActionResponse> {
  try {
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { error: 'No session found' }
    }

    const res = await api(`/api/v1/supabase/users/${user.id}`, {
      cache: 'force-cache',
      next: {
        tags: [`user:${user.id}`],
      },
    })

    if (!res.ok) {
      return { error: 'Error to get user' }
    }

    const json = await res.json()

    return { success: json.data }
  } catch (error) {
    console.error(error)
    return { error: 'Something went wrong' }
  }
}
