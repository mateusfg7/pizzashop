import { Elysia } from 'elysia'
import { logger } from '@grotto/logysia'
import { swagger } from '@elysiajs/swagger'
import { cors } from '@elysiajs/cors'

import { NotFoundError } from './errors/not-found-error'
import { routes } from './routes'

const app = new Elysia()
  .use(
    cors({
      credentials: true,
      allowedHeaders: ['content-type'],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
      origin: (request): boolean => {
        const origin = request.headers.get('origin')

        if (!origin) {
          return false
        }

        return true
      },
    })
  )
  .use(logger({ logIP: true }))
  .use(swagger())
  .error({
    NOT_FOUND: NotFoundError,
  })
  .onError(({ code, error, set }) => {
    switch (code) {
      case 'NOT_FOUND':
        set.status = 404
        return { code, message: error.message }
    }
  })
  .use(routes)

app.listen(3000)

console.log(
  `🔥 HTTP server running at ${app.server?.hostname}:${app.server?.port}\n`
)
