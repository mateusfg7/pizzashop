import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'

import { cn } from '~/lib/utils'
import { ThemeProvider } from '~/components/theme-provider'

import './globals.css'

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body
        className={cn('min-h-screen font-sans antialiased', fontSans.variable)}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  title: 'Pizza Shop',
  description: 'The best Pizza Shop of the world!',
}
