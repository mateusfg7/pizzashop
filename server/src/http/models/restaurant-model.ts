import { t } from 'elysia'

export const restaurantModel = t.Object({
  name: t.String(),
  id: t.String(),
  createdAt: t.Union([t.Date(), t.Null()]),
  updatedAt: t.Union([t.Date(), t.Null()]),
  description: t.String(),
  managerId: t.Union([t.String(), t.Null()]),
})
