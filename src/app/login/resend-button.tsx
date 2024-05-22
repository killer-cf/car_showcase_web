'use client'

import { useSearchParams } from 'next/navigation'

import { createClient } from '@/utils/supabase/client'

export const ResendButton = () => {
  const supabase = createClient()
  const params = useSearchParams()
  const email = params.get('email')

  async function resendEmailConfirmation() {
    if (!email) return

    console.log('email', email)

    const { error } = await supabase.auth.resend({
      email,
      type: 'signup',
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    })

    if (error) {
      console.error('error', error)
    }
  }

  return (
    <button onClick={resendEmailConfirmation} disabled={!email}>
      Resend email confirmation
    </button>
  )
}
