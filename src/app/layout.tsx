import './globals.css'

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import localFont from 'next/font/local'

import { fetchBrands } from '@/actions/fetch-brands'
import { getAuthenticatedUser } from '@/actions/user'
import { Header } from '@/components/header'
import { cn } from '@/lib/utils'

import { Providers } from './providers'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

const fontApercu = localFont({
  src: [
    {
      path: '../fonts/Apercu-font/Apercu-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/Apercu-font/Apercu-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/Apercu-font/Apercu-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-apercu',
})

export const metadata: Metadata = {
  title: 'CarShowcase',
  description: 'The best place to buy and sell cars',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const queryClient = new QueryClient()

  const { success } = await queryClient.fetchQuery({
    queryKey: ['user'],
    queryFn: getAuthenticatedUser,
  })

  await queryClient.prefetchQuery({
    queryKey: ['brands'],
    queryFn: async () => fetchBrands(),
  })

  return (
    <html lang="pt-BR">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
          fontApercu.variable,
        )}
      >
        <Providers>
          <div>
            <Header user={success?.user} />
            <HydrationBoundary state={dehydrate(queryClient)}>
              {children}
            </HydrationBoundary>
          </div>
        </Providers>
      </body>
    </html>
  )
}
