import { UseFormReturn } from 'react-hook-form'
import * as z from 'zod'

export const registerFormSchema = z.object({
  restaurantName: z
    .string()
    .min(2, 'O nome do estabelecimento deve ter pelo menos 2 caracteres'),
  managerName: z
    .string()
    .min(2, 'O nome do administrador deve ter pelo menos 2 caracteres'),
  phone: z.string().length(15, 'Número de telefone inválido'),
})
export type RegisterFormSchema = z.infer<typeof registerFormSchema>
export type RegisterForm = UseFormReturn<RegisterFormSchema, any, undefined>

export const authFormSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),
})
export type AuthFormSchema = z.infer<typeof authFormSchema>
export type AuthForm = UseFormReturn<AuthFormSchema, any, undefined>
