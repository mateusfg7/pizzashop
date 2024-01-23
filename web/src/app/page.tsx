'use client'

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

export default function Home() {
  const [data, setData] = useState<ProfileData | undefined>()

  useEffect(() => {
    async function getData() {
      const result = await api.get<ProfileData>('/profile')
      setData(result.data)
    }

    getData()
  }, [])

  if (!data)
    return (
      <main className='flex min-h-screen flex-col items-center justify-between p-24'>
        <h1>Loading data...</h1>
      </main>
    )

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
