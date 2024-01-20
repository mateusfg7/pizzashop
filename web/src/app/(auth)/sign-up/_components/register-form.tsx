import { FieldError } from 'react-hook-form'
import { cva } from 'class-variance-authority'
import { ArrowRight } from 'lucide-react'

import { Label } from '~/components/ui/label'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'

import { RegisterForm, RegisterFormSchema } from '../_lib/form-utils'
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
  form: RegisterForm
  onSubmit: (schema: RegisterFormSchema) => void
}
export function RegisterForm({ form, onSubmit }: Props) {
  const errors = form.formState.errors

  return (
    <div className='space-y-8'>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-4 text-lg'
      >
        <div className='space-y-2'>
          <Label className='text-lg' htmlFor='restaurant-name'>
            Nome do estabelecimento
          </Label>
          <Input
            className={inputVariant({
              error: errors.restaurantName !== undefined,
            })}
            id='restaurant-name'
            type='text'
            {...form.register('restaurantName')}
          />
          <ErrorMessage error={errors.restaurantName} />
        </div>
        <div className='space-y-2'>
          <Label className='text-lg' htmlFor='manager-name'>
            Seu nome
          </Label>
          <Input
            className={inputVariant({
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
            Celular
          </Label>
          <Input
            {...form.register('phone')}
            className={inputVariant({
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
        <Button
          type='submit'
          className='py-5 text-lg flex items-center justify-between leading-none w-full'
        >
          <span />
          <span>Próximo</span>
          <ArrowRight size='1em' />
        </Button>
      </form>
    </div>
  )
}
