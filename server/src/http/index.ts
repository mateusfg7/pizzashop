import { logger } from '@grotto/logysia'
import { Elysia } from 'elysia'

const app = new Elysia()
  .use(logger({ logIP: true }))
  .get('/', () => 'Hello Elysia')
  .listen(3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}\n`
)
