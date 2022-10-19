import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Rol } from "../models/Rol";

class RolesController {
  /* A function that returns a list of roles. */
  static listRoles = async (req: Request, res: Response) => {
    /* Getting the repository of the Rol model. */
    const repoRoles = AppDataSource.getRepository(Rol);
    /* A block of code to be tested for errors while it is being executed. */
    try {
      /* A query to the database. */
      const roles = await repoRoles.find({
        where: { state: true },
      });

      return roles.length > 0
        ? res.json({
            ok: true,
            msg: "list of roles",
            roles,
          })
        : res.json({ ok: false, msg: "data not found", roles });

      /* Catching the error and returning it in the response. */
    } catch (e) {
      return res.json({
        ok: false,
        msg: `Error => ${e}`,
      });
    }
  };

  /* This function is used to find a role by id. */
  static byIdRol = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const repoRol = AppDataSource.getRepository(Rol);
    try {
      const rol = await repoRol.findOne({
        where: { id },
      });
      return rol
        ? res.json({ ok: true, rol })
        : res.json({ ok: false, msg: "The id dont exist" });
    } catch (e) {
      return res.json({
        ok: false,
        msg: "Server error",
      });
    }
  };

  /* This function is used to create a role. */
  static createRoles = async (req: Request, res: Response) => {
    const { rol } = req.body;
    const repoRoles = AppDataSource.getRepository(Rol);
    try {
      const role = new Rol();
      role.rol = rol;
      await repoRoles.save(role);
      return res.json({
        ok: true,
        msg: "Roles was create",
      });
    } catch (e) {
      return res.json({
        ok: false,
        msg: `Error => ${e}`,
      });
    }
  };

  static updateRol = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { rol } = req.body;
    const repoRol = AppDataSource.getRepository(Rol);
    let role: Rol;
    try {
      role = await repoRol.findOneOrFail({
        where: { id, state: true },
      });
      if (!role) {
        throw new Error("Role dont exist in data base");
      }
      role.rol = rol;
      await repoRol.save(role);
      return res.json({
        ok: true,
        msg: "Rol was update",
      });
    } catch (e) {
      return res.json({
        ok: false,
        msg: "Server error",
      });
    }
  };

  static deleteRol = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const repoRol = AppDataSource.getRepository(Rol);
    try {
      const rol = await repoRol.findOne({
        where: { id },
      });
      if (!rol) {
        throw new Error("Role dont exist in data base");
      }
      rol.state = false;
      await repoRol.save(rol);
      return res.json({
        ok: true,
        msg: "Rol was delete",
      });
    } catch (e) {
      return res.json({
        ok: false,
        msg: "Server error",
      });
    }
  };
}

export default RolesController;
