'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Logo } from '~/components/logo'
import { ThemeToggle } from '~/components/theme-toggle'

import { Button } from '~/components/ui/button'

export default function AuthLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const targetPath = pathname.startsWith('/sign-in') ? 'sign-up' : 'sign-in'

  return (
    <div className='flex h-screen'>
      <div className='flex flex-col justify-between flex-1 p-10 bg-neutral-100 dark:bg-neutral-900'>
        <Logo />
        <footer className='text-sm text-neutral-500'>
          Painel do parceiro &copy; pizza.shop - {new Date().getFullYear()}
        </footer>
      </div>
      <div className='flex justify-center flex-auto p-10 overflow-y-scroll'>
        {children}
      </div>
      <Link href={`/${targetPath}`} className='fixed top-8 right-8'>
        <Button variant='ghost'>
          {targetPath === 'sign-in' && 'Fazer login'}
          {targetPath === 'sign-up' && 'Novo estabelecimento'}
        </Button>
      </Link>
      <div className='fixed bottom-3 right-3'>
        <ThemeToggle />
      </div>
    </div>
  )
}
