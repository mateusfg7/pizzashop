'use client'

import { Home, Pizza, UtensilsCrossed } from 'lucide-react'

import { ThemeToggle } from '~/components/theme-toggle'
import { Separator } from '~/components/ui/separator'
import { NavLink } from './nav-link'
import { AccountMenu } from './account-menu'

export function Header() {
  return (
    <div className='border-b border-neutral-200 dark:border-neutral-800'>
      <div className='flex h-16 items-center gap-6 px-6'>
        <Pizza className='h-6 w-6' />

        <Separator orientation='vertical' className='h-6' />

        <nav className='flex items-center space-x-4 lg:space-x-6'>
          <NavLink href='/'>
            <Home className='h-4 w-4' />
            <span>Início</span>
          </NavLink>
          <NavLink href='/orders'>
            <UtensilsCrossed className='h-4 w-4' />
            <span>Pedidos</span>
          </NavLink>
        </nav>

        <div className='ml-auto flex items-center space-x-2'>
          <ThemeToggle />
          <AccountMenu />
        </div>
      </div>
    </div>
  )
}
