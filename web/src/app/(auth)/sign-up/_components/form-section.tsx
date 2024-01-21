import { ReactNode } from 'react'

export const FormSection = ({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) => (
  <div className='space-y-4'>
    <h2 className='text-neutral-500 text-sm inline-flex items-center gap-3 w-full'>
      <span>{title}</span>
      <div className='w-full h-px bg-neutral-500/50' />
    </h2>
    <div className='space-y-4'>{children}</div>
  </div>
)
