import Elysia, { t } from 'elysia'
import * as argon2 from 'argon2'

import { db } from '~/db/connection'
import { restaurants, users } from '~/db/schema'

const bodySchema = t.Object({
  restaurantName: t.String(),
  restaurantDescription: t.String(),
  managerName: t.String({ minLength: 2 }),
  phone: t.String(),
  email: t.String({
    format: 'email',
    default: null,
  }),
  managerPassword: t.String({ minLength: 8 }),
})

const restaurantModel = t.Object({
  id: t.String(),
  name: t.String(),
  description: t.String(),
  managerId: t.Union([t.String(), t.Null()]),
  createdAt: t.Union([t.Date(), t.Null()]),
  updatedAt: t.Union([t.Date(), t.Null()]),
})

export const registerRestaurant = new Elysia().post(
  '/restaurants',
  async ({ body, set }) => {
    const {
      email,
      managerName,
      managerPassword,
      phone,
      restaurantDescription,
      restaurantName,
    } = body

    const passwordHash = await argon2.hash(managerPassword)

    const [manager] = await db
      .insert(users)
      .values({
        name: managerName,
        email,
        passwordHash,
        phone,
        role: 'manager',
      })
      .returning()

    const [restaurant] = await db
      .insert(restaurants)
      .values({
        name: restaurantName,
        description: restaurantDescription,
        managerId: manager.id,
      })
      .returning()

    set.status = 201

    return restaurant
  },
  {
    body: bodySchema,
    response: restaurantModel,
  }
)
