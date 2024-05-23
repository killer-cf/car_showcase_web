'use client'

import { createClient } from '@/utils/supabase/client'

interface ResendButtonProps {
  email: string
}

export const ResendButton = ({ email }: ResendButtonProps) => {
  const supabase = createClient()

  async function resendEmailConfirmation() {
    if (!email) return

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
      Reenviar email de confirmação
    </button>
  )
}
