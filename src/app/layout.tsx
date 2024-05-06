import './globals.css'

import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import localFont from 'next/font/local'
import { ToastContainer } from 'react-toastify'

import { Header } from '@/components/header'
import Providers from '@/lib/query-provider'
import { cn } from '@/lib/utils'

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
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
            <Header />
            {children}
          </div>
          <div className="absolute top-0 right-0 ">
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
          </div>
        </Providers>
      </body>
    </html>
  )
}
