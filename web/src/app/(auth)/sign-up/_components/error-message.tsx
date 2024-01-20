import { FieldError } from 'react-hook-form'

export const ErrorMessage = ({ error }: { error: FieldError | undefined }) => {
  if (!error) return

  return (
    <span className='text-sm flex text-red-600 dark:text-red-500'>
      {error.message}
    </span>
  )
}
