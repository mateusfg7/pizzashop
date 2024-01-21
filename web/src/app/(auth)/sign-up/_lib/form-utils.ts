import * as z from 'zod'

export const formSchema = z.object({
  restaurantName: z
    .string()
    .min(2, 'O nome do estabelecimento deve ter pelo menos 2 caracteres'),
  restaurantDescription: z
    .string()
    .min(5, 'A descrição deve ter no mínimo 5 caracteres')
    .max(50, 'A descrição deve ter no máximo 50 caracteres'),
  managerName: z
    .string()
    .min(2, 'O nome do administrador deve ter pelo menos 2 caracteres'),
  phone: z.string().length(15, 'Número de telefone inválido'),
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),
})
export type FormSchema = z.infer<typeof formSchema>
