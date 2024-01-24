import { ComponentProps } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export type NavLinkProps = ComponentProps<typeof Link>

export function NavLink({ href, ...rest }: NavLinkProps) {
  const pathname = usePathname()

  return (
    <Link
      {...rest}
      href={href}
      data-current={pathname === href}
      className='flex items-center gap-1.5 text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-950 hover:dark:text-neutral-100 data-[current=true]:text-neutral-950 data-[current=true]:dark:text-neutral-100'
    />
  )
}
