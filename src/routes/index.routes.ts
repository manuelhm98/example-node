import dotenv from 'dotenv'
import { Router } from 'express'
import routerRol from './roles.routes'

dotenv.config()
const URL = process.env.URL

const routes = Router()

routes.use(`${URL}/rol`, routerRol)

export default routes
