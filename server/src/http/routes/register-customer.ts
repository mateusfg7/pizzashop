import Elysia, { t } from 'elysia'
import * as argon2 from 'argon2'

import { db } from '~/db/connection'
import { users } from '~/db/schema'
import { userModel } from '../models/user-model'

export const registerCustomer = new Elysia().post(
  '/customers',
  async ({ body, set }) => {
    const { name, email, phone, password } = body

    const passwordHash = await argon2.hash(password)

    const user = await db
      .insert(users)
      .values({ name, email, passwordHash, phone })
      .returning({
        name: users.name,
        email: users.email,
        phone: users.phone,
        role: users.role,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
      })

    set.status = 201

    return user[0]
  },
  {
    body: t.Object({
      name: t.String({ minLength: 2 }),
      password: t.String({ minLength: 8 }),
      phone: t.String(),
      email: t.String({ format: 'email', default: null }),
    }),
    response: userModel,
  }
)
