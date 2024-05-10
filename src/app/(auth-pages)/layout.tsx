import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { auth } from '@/auth'

export default async function AuthPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()

  console.log(session)

  console.log('ERROR NO BRANDS PAGE', session?.error)

  if (!session || session?.error) {
    revalidatePath('/')
    redirect('/')
  }

  return <div>{children}</div>
}
