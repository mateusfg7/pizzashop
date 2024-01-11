import { Elysia } from 'elysia'
import { logger } from '@grotto/logysia'

import { routes } from './routes'

const app = new Elysia().use(logger({ logIP: true })).use(routes)

app.listen(3000)

console.log(
  `🔥 HTTP server running at ${app.server?.hostname}:${app.server?.port}\n`
)
