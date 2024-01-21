import { ReactNode } from 'react'
import { Logo } from '~/components/logo'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className='flex h-screen'>
      <div className='flex flex-col justify-between flex-1 p-10 bg-neutral-100 dark:bg-neutral-900'>
        <Logo />
        <footer className='text-sm text-neutral-500'>
          Painel do parceiro &copy; pizza.shop - {new Date().getFullYear()}
        </footer>
      </div>
      <div className='flex justify-center flex-auto p-10 pt-20 overflow-y-scroll'>
        {children}
      </div>
    </div>
  )
}
