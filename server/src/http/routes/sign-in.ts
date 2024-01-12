import Elysia from 'elysia'
import * as argon2 from 'argon2'

import { z } from 'zod'
import { eq } from 'drizzle-orm'

import { db } from '~/db/connection'
import { users } from '~/db/schema'

import { authentication } from '../authentication'
import { UnauthorizedError } from '../errors/unauthorized-error'

const signInBodySchema = z.object({
  password: z.string(),
  email: z.string().email(),
})

export const signIn = new Elysia()
  .use(authentication)
  .post('/sign-in', async ({ body, signUser }) => {
    const { email, password } = signInBodySchema.parse(body)

    const result = await db
      .select({ passwordHash: users.passwordHash, id: users.id })
      .from(users)
      .where(eq(users.email, email))

    if (result.length < 1) {
      throw new UnauthorizedError('Email or password is incorrect.')
    }

    const passwordHash = result[0].passwordHash
    const passwordIsCorrect = await argon2.verify(passwordHash, password)

    if (passwordIsCorrect) {
      await signUser({ sub: result[0].id })
    } else {
      throw new UnauthorizedError('Email or password is incorrect.')
    }
  })
