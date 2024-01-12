import Elysia from 'elysia'

import { helloWorld } from './hello-world'
import { registerCustomer } from './register-customer'
import { signIn } from './sign-in'
import { profile } from './profile'

export const routes = new Elysia()
  .use(helloWorld)
  .use(registerCustomer)
  .use(signIn)
  .use(profile)
