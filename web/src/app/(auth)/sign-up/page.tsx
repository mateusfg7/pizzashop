'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

import { Label } from '~/components/ui/label'
import { Input } from '~/components/ui/input'
import { Textarea } from '~/components/ui/textarea'
import { Button } from '~/components/ui/button'

import { FormSchema, formSchema } from './_lib/form-schema'
import { formatBrPhoneNumber } from './_lib/format-br-phone-number'

import { ErrorMessage } from './_components/error-message'
import { inputStyles } from './_components/input-styles'
import { Title } from './_components/title'
import { FormSection } from './_components/form-section'

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export default function Page() {
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  })
  const errors = form.formState.errors

  async function handleRegisterRestaurant(values: FormSchema) {
    console.log(values)

    setIsLoading(true)
    await sleep(3000)
      .then(() => {
        toast.success('Restaurante cadastrado!', {
          description: '',
          action: {
            label: 'Login',
            onClick: () => {
              router.push('/sign-in')
            },
          },
        })
      })
      .catch((e) => {
        toast.error('Erro ao cadastrar restaurante.')
      })
    setIsLoading(false)
  }

  return (
    <div className='space-y-11 w-96 pt-10 pb-32 h-fit'>
      <Title />
      <form
        onSubmit={form.handleSubmit(handleRegisterRestaurant)}
        className='space-y-9 text-lg'
      >
        <FormSection title='Estabelecimento'>
          <div className='space-y-2'>
            <Label className='text-lg' htmlFor='restaurant-name'>
              Nome do estabelecimento
            </Label>
            <Input
              className={inputStyles({
                error: errors.restaurantName !== undefined,
              })}
              id='restaurant-name'
              type='text'
              {...form.register('restaurantName')}
            />
            <ErrorMessage error={errors.restaurantName} />
          </div>
          <div className='space-y-2'>
            <Label className='text-lg' htmlFor='restaurant-description'>
              Descrição do estabelecimento
            </Label>
            <Textarea
              className={inputStyles({
                error: errors.restaurantDescription !== undefined,
                class: /*tw:*/ 'py-2',
              })}
              id='restaurant-description'
              {...form.register('restaurantDescription')}
            />
            <ErrorMessage error={errors.restaurantDescription} />
          </div>
        </FormSection>
        <FormSection title='Administrador'>
          <div className='space-y-2'>
            <Label className='text-lg' htmlFor='manager-name'>
              Seu nome
            </Label>
            <Input
              className={inputStyles({
                error: errors.managerName !== undefined,
              })}
              id='manager-name'
              type='text'
              {...form.register('managerName')}
            />
            <ErrorMessage error={errors.managerName} />
          </div>
          <div className='space-y-2'>
            <Label className='text-lg' htmlFor='phone'>
              Telefone
            </Label>
            <Input
              {...form.register('phone')}
              className={inputStyles({
                error: errors.phone !== undefined,
              })}
              id='phone'
              type='tel'
              placeholder='(99) 9999-9999'
              onChange={(e) => {
                if (e.target.value.length === 15) form.setError('phone', {})
                form.setValue('phone', formatBrPhoneNumber(e.target.value))
              }}
            />
            <ErrorMessage error={errors.phone} />
          </div>
          <div className='space-y-2'>
            <Label className='text-lg' htmlFor='email'>
              Seu email
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
              placeholder='contato@email.com'
              {...form.register('email')}
            />
            <ErrorMessage error={errors.email} />
          </div>
          <div className='space-y-2'>
            <Label className='text-lg' htmlFor='password'>
              Senha segura
            </Label>
            <Input
              className={inputStyles({
                error: errors.password !== undefined,
              })}
              id='password'
              type='password'
              {...form.register('password')}
            />
            <ErrorMessage error={errors.password} />
          </div>
        </FormSection>
        <Button
          type='submit'
          className='py-5 text-lg leading-none w-full '
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className='animate-spin' />
          ) : (
            <span>Finalizar cadastro</span>
          )}
        </Button>
      </form>
    </div>
  )
}
