'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

import { Label } from '~/components/ui/label'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'

import { FormSchema, formSchema } from './_lib/form-schema'

import { ErrorMessage } from './_components/error-message'
import { inputStyles } from './_components/input-styles'
import { Title } from './_components/title'

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export default function Page() {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  })
  const errors = form.formState.errors

  async function handleRegisterRestaurant(values: FormSchema) {
    console.log(values)

    setIsLoading(true)
    await sleep(3000)
      .then(() => {
        toast.success('Login realizado com sucesso!')
      })
      .catch((e) => {
        toast.error('Erro ao fazer login')
      })
    setIsLoading(false)
  }

  return (
    <div className='w-96 h-full flex flex-col justify-center gap-11'>
      <Title />
      <form
        onSubmit={form.handleSubmit(handleRegisterRestaurant)}
        className='space-y-9 text-lg'
      >
        <div className='space-y-5'>
          <div className='space-y-2'>
            <Label className='text-lg' htmlFor='email'>
              Email
            </Label>
            <Input
              className={inputStyles({
                error: errors.email !== undefined,
              })}
              id='email'
              type='email'
              autoCapitalize='none'
              autoComplete='email'
              autoCorrect='off'
              placeholder='email@exemplo.com'
              {...form.register('email')}
            />
            <ErrorMessage error={errors.email} />
          </div>
          <div className='space-y-2'>
            <Label className='text-lg' htmlFor='password'>
              Senha
            </Label>
            <Input
              className={inputStyles({
                error: errors.password !== undefined,
                class: /*tw:*/ 'py-2',
              })}
              type='password'
              id='password'
              {...form.register('password')}
            />
            <ErrorMessage error={errors.password} />
          </div>
        </div>
        <Button
          type='submit'
          className='py-5 text-lg leading-none w-full '
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className='animate-spin' />
          ) : (
            <span>Acessar painel</span>
          )}
        </Button>
      </form>
    </div>
  )
}
