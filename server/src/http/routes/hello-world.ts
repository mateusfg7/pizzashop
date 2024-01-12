import Elysia from 'elysia'

export const helloWorld = new Elysia().get('/', () => 'Hello World!')
