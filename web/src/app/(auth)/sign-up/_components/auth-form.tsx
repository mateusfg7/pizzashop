import { ArrowLeft, Loader, Loader2 } from 'lucide-react'

import { Label } from '~/components/ui/label'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'

import { AuthFormSchema, AuthForm } from '../_lib/form-utils'

import { inputStyles } from './input-styles'
import { ErrorMessage } from './error-message'

type Props = {
  form: AuthForm
  onSubmit: (schema: AuthFormSchema) => void
  isLoading: boolean
  goBack: () => void
}
export function AuthForm({ form, onSubmit, goBack, isLoading }: Props) {
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
        <div>
          <Button
            type='submit'
            className='py-5 text-lg leading-none w-full '
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className='animate-spin' />
            ) : (
              <span>Finalizar Cadastro</span>
            )}
          </Button>
          {!isLoading && (
            <Button
              onClick={goBack}
              type='button'
              variant='link'
              className='space-x-1 p-0'
            >
              <ArrowLeft size='1em' className='text-sm' />
              <span className='text-sm'>Voltar</span>
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}
