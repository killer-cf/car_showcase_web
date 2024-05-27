import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { getAuthenticatedUser } from '@/actions/user'

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { success } = await getAuthenticatedUser()

  if (!success) {
    revalidatePath('/')
    redirect('/')
  }

  return <div>{children}</div>
}
