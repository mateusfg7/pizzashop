import Elysia from 'elysia'

export const routes = new Elysia().get('/', () => 'Hello Elysia')
