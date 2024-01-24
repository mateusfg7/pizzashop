import Elysia, { t } from 'elysia'
import * as argon2 from 'argon2'

import { db } from '~/db/connection'

import { authentication } from '../authentication'
import { UnauthorizedError } from '../errors/unauthorized-error'

export const signIn = new Elysia().use(authentication).post(
  '/sign-in',
  async ({ body, signUser }) => {
    const { email, password } = body

    const result = await db.query.users.findFirst({
      where(fields, { eq }) {
        return eq(fields.email, email)
      },
    })

    if (!result) {
      throw new UnauthorizedError('Email or password is incorrect.')
    }

    const { passwordHash, role, id } = result
    const passwordIsCorrect = await argon2.verify(passwordHash, password)

    if (!passwordIsCorrect) {
      throw new UnauthorizedError('Email or password is incorrect.')
    }

    if (role !== 'manager') {
      await signUser({ sub: result.id })
      return
    }

    const restaurant = await db.query.restaurants.findFirst({
      where(fields, { eq }) {
        return eq(fields.managerId, id)
      },
      columns: {
        id: true,
      },
    })

    if (!restaurant) {
      await signUser({ sub: result.id })
      return
    }

    await signUser({ sub: result.id, restaurantId: restaurant.id })
  },
  {
    body: t.Object({
      password: t.String(),
      email: t.String({ format: 'email', default: null }),
    }),
  }
)
