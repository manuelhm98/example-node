import { Router } from 'express'
import RolesController from '../controllers/roles.controller'

const router = Router()
const rol = RolesController

router.get('/', rol.listRoles)
router.post('/', rol.createRoles)

export default router
