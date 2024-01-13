import Elysia from 'elysia'

import { helloWorld } from './hello-world'
import { registerCustomer } from './register-customer'
import { signIn } from './sign-in'
import { profile } from './profile'
import { registerRestaurant } from './register-restaurant'

export const routes = new Elysia()
  .use(helloWorld)
  .use(registerCustomer)
  .use(signIn)
  .use(profile)
  .use(registerRestaurant)
