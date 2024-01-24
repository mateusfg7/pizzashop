'use client'

import { QueryClientProvider as ReactQueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'

import { queryClient } from '~/lib/react-query'

type Props = {
  children: ReactNode
}
export function QueryClientProvider({ children }: Props) {
  return (
    <ReactQueryClientProvider client={queryClient}>
      {children}
    </ReactQueryClientProvider>
  )
}
