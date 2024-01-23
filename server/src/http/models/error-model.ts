import { t } from 'elysia'

export const errorModel = t.Object({
  code: t.String(),
  message: t.String(),
})
