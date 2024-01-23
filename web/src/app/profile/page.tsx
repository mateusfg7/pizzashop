'use client'

import { AxiosError } from 'axios'
import { AlertTriangle, Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { api } from '~/lib/axios'

type ProfileData = {
  name: string
  email: string
  phone: string
  role: string
  createdAt: string
  updatedAt: string
}

type ErrorData = {
  code: string
  message: string
}

export default function Home() {
  const [data, setData] = useState<ProfileData | undefined>()
  const [error, setError] = useState<ErrorData | undefined>()

  useEffect(() => {
    async function getData() {
      await api
        .get<ProfileData | ErrorData>('/profile')
        .then((response) => {
          const responseData = response.data as ProfileData
          setData(responseData)
        })
        .catch((e: AxiosError) => {
          const responseData = e.response?.data as ErrorData

          setError(responseData)
        })
    }

    getData()
  }, [])

  if (!data && !error) {
    return (
      <main className='flex min-h-screen flex-col items-center justify-between p-24'>
        <h1 className='flex gap-2 items-center text-xl'>
          <Loader2 className='animate-spin' />
          <span>Carregando dados</span>
        </h1>
      </main>
    )
  }

  if (!data && error) {
    return (
      <main className='flex min-h-screen flex-col items-center gap-10 p-24'>
        <h1 className='flex gap-2 items-center text-xl'>
          <AlertTriangle />
          <span className='font-bold'>Error</span>
        </h1>
        <p>
          {error.code} | {error.message}
        </p>
      </main>
    )
  }

  if (!error && data) {
    return (
      <main className='flex min-h-screen flex-col items-center p-24 space-y-10'>
        <h1 className='text-2xl'>Pizza Shop</h1>
        <div className='flex w-fit'>
          <div className='font-bold flex-1 flex flex-col items-start'>
            <span className='text-left p-2 border-b border-neutral-800 last:border-none w-full'>
              Nome
            </span>
            <span className='text-left p-2 border-b border-neutral-800 last:border-none w-full'>
              Email
            </span>
            <span className='text-left p-2 border-b border-neutral-800 last:border-none w-full'>
              Telefone
            </span>
            <span className='text-left p-2 border-b border-neutral-800 last:border-none w-full'>
              Cargo
            </span>
            <span className='text-left p-2 border-b border-neutral-800 last:border-none w-full'>
              Criação
            </span>
            <span className='text-left p-2 border-b border-neutral-800 last:border-none w-full'>
              Ultima modificação
            </span>
          </div>
          <div className='flex-1 flex flex-col items-end'>
            <span className='text-right p-2 border-b border-neutral-800 last:border-none w-full'>
              {data.name}
            </span>
            <span className='text-right p-2 border-b border-neutral-800 last:border-none w-full'>
              {data.email}
            </span>
            <span className='text-right p-2 border-b border-neutral-800 last:border-none w-full'>
              {data.phone}
            </span>
            <span className='text-right p-2 border-b border-neutral-800 last:border-none w-full'>
              {data.role}
            </span>
            <span className='text-right p-2 border-b border-neutral-800 last:border-none w-full'>
              {data.createdAt}
            </span>
            <span className='text-right p-2 border-b border-neutral-800 last:border-none w-full'>
              {data.updatedAt}
            </span>
          </div>
        </div>
      </main>
    )
  }
}
