import Elysia from 'elysia'
import { eq } from 'drizzle-orm'

import { db } from '~/db/connection'
import { users } from '~/db/schema'

import { authentication } from '../authentication'
import { NotFoundError } from '../errors/not-found-error'

export const profile = new Elysia()
  .use(authentication)
  .get('/profile', async ({ getCurrentUser }) => {
    const currentUser = await getCurrentUser()

    const user = await db.query.users.findFirst({
      where: eq(users.id, currentUser.sub),
      columns: {
        name: true,
        email: true,
        phone: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    if (!user) {
      throw new NotFoundError('User not found.')
    }

    return user
  })
