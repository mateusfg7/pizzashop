import { cva } from 'class-variance-authority'

export const inputStyles = cva('text-lg py-5', {
  variants: {
    error: {
      true: /*tw:*/ 'focus-visible:ring-red-500 dark:focus-visible:ring-red-500',
    },
  },
})
