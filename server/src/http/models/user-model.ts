import { t } from 'elysia'

export const userModel = t.Object({
  name: t.String(),
  email: t.String({ format: 'email', default: null }),
  phone: t.Union([t.String(), t.Null()]),
  role: t.Union([t.Literal('customer'), t.Literal('manager')]),
  createdAt: t.Union([t.Date(), t.Null()]),
  updatedAt: t.Union([t.Date(), t.Null()]),
})
