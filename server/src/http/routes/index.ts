import Elysia from 'elysia'

import { helloWorld } from './hello-world'
import { registerCustomer } from './register-customer'

export const routes = new Elysia().use(helloWorld).use(registerCustomer)
