import * as z from 'zod'

export const formSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'A senha não pode estar vazia'),
})
export type FormSchema = z.infer<typeof formSchema>
