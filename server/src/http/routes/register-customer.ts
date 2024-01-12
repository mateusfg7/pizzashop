import Elysia from 'elysia'
import * as argon2 from 'argon2'

import { z } from 'zod'

import { db } from '~/db/connection'
import { users } from '~/db/schema'

const registerCustomerBodySchema = z.object({
  name: z.string().min(1),
  password: z.string().min(8),
  phone: z.string(),
  email: z.string().email(),
})

export const registerCustomer = new Elysia().post(
  '/customers',
  async ({ body, set }) => {
    const { name, email, phone, password } =
      registerCustomerBodySchema.parse(body)

    const passwordHash = await argon2.hash(password)

    const user = await db
      .insert(users)
      .values({ name, email, passwordHash, phone })
      .returning({
        id: users.id,
        name: users.name,
        email: users.email,
        phone: users.phone,
        role: users.role,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
      })

    set.status = 201

    return user
  }
)
