import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { auth } from '@/auth'

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session || session?.error) {
    revalidatePath('/')
    redirect('/')
  }

  return <div>{children}</div>
}
