import { Request, Response } from 'express'
import { AppDataSource } from '../data-source'
import { Rol } from '../models/Rol'

class RolesController {
  /* A function that returns a list of roles. */
  static listRoles = async (req: Request, res: Response) => {
    /* Getting the repository of the Rol model. */
    const repoRoles = AppDataSource.getRepository(Rol)
    /* A block of code to be tested for errors while it is being executed. */
    try {
      /* A query to the database. */
      const roles = await repoRoles.find({
        where: { state: true },
      })

      return roles
        ? res.json({
            ok: true,
            msg: 'list of roles',
            roles,
          })
        : res.json({ ok: false, msg: 'data not found', roles })

      /* Catching the error and returning it in the response. */
    } catch (e) {
      return res.json({
        ok: false,
        msg: `Error => ${e}`,
      })
    }
  }

  static createRoles = async (req: Request, res: Response) => {
    const { rol } = req.body
    const repoRoles = AppDataSource.getRepository(Rol)
    try {
      const role = new Rol()
      role.rol = rol
      await repoRoles.save(role)
      return res.json({
        ok: true,
        msg: 'Roles was create',
      })
    } catch (e) {
      return res.json({
        ok: false,
        msg: `Error => ${e}`,
      })
    }
  }
}

export default RolesController
