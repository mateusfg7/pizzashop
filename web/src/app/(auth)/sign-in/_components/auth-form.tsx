import { FieldError } from 'react-hook-form'
import { cva } from 'class-variance-authority'
import { ArrowLeft, ArrowRight } from 'lucide-react'

import { Label } from '~/components/ui/label'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'

import { AuthFormSchema, AuthForm } from '../_lib/form-utils'
import { formatBrPhoneNumber } from '../_lib/format-br-phone-number'

const inputVariant = cva('text-lg py-5', {
  variants: {
    error: {
      true: /*tw:*/ 'focus-visible:ring-red-500',
    },
  },
})

const ErrorMessage = ({ error }: { error: FieldError | undefined }) => {
  if (!error) return

  return <span className='text-sm flex text-red-600'>{error.message}</span>
}

type Props = {
  form: AuthForm
  onSubmit: (schema: AuthFormSchema) => void
  goBack: () => void
}
export function AuthForm({ form, onSubmit, goBack }: Props) {
  const errors = form.formState.errors

  return (
    <div className='space-y-8'>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-4 text-lg'
      >
        <div className='space-y-2'>
          <Label className='text-lg' htmlFor='email'>
            Seu email
          </Label>
          <Input
            className={inputVariant({
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
            className={inputVariant({
              error: errors.password !== undefined,
            })}
            id='password'
            type='password'
            {...form.register('password')}
          />
          <ErrorMessage error={errors.password} />
        </div>
        <div>
          <Button type='submit' className='py-5 text-lg leading-none w-full'>
            <span>Finalizar Cadastro</span>
          </Button>
          <Button
            onClick={goBack}
            type='button'
            variant='link'
            className='space-x-1 p-0'
          >
            <ArrowLeft size='1em' className='text-sm' />
            <span className='text-sm'>Voltar</span>
          </Button>
        </div>
      </form>
    </div>
  )
}
