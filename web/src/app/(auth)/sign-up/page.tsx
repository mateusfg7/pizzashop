'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { RegisterForm } from './_components/register-form'
import { AuthForm } from './_components/auth-form'
import {
  AuthFormSchema,
  RegisterFormSchema,
  authFormSchema,
  registerFormSchema,
} from './_lib/form-utils'

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export default function Page() {
  const [stage, setStage] = useState<'register' | 'auth'>('auth')
  const [isLoading, setIsLoading] = useState(false)

  const registerForm = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
  })

  const authForm = useForm<AuthFormSchema>({
    resolver: zodResolver(authFormSchema),
  })

  const nextStage = () => setStage('auth')

  async function submitForms() {
    console.log(`
    Restaurante: ${registerForm.getValues('restaurantName')}
    Gerencia: ${registerForm.getValues('managerName')}
    Telefone: ${registerForm.getValues('phone')}
    Email: ${authForm.getValues('email')}
    Senha: ${authForm.getValues('password')}
    `)

    setIsLoading(true)
    await sleep(3000)
    setIsLoading(false)
  }

  return (
    <div className='space-y-8 w-96'>
      <div className='space-y-2 text-center'>
        <h1 className='text-2xl font-bold'>Criar conta grátis</h1>
        <span className='text-neutral-700 dark:text-neutral-400 text-sm'>
          Seja um parceiro <span className='font-bold'>pizza.shop</span> e
          comece suas vendas!
        </span>
      </div>
      {stage === 'register' && (
        <RegisterForm form={registerForm} onSubmit={nextStage} />
      )}
      {stage === 'auth' && (
        <AuthForm
          isLoading={isLoading}
          form={authForm}
          onSubmit={submitForms}
          goBack={() => setStage('register')}
        />
      )}
    </div>
  )
}
