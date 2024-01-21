import * as z from 'zod'

export const formSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string(),
})
export type FormSchema = z.infer<typeof formSchema>
