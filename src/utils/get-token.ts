import 'server-only'

import { createClient } from './supabase/server'

export async function getToken() {
  const supabase = createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session || session.error) {
    return { error: 'Token expired or no session' }
  }

  const accessToken = session?.access_token

  return { accessToken, session }
}
