import { Router } from "express";
import RolesController from "../controllers/roles.controller";

const router = Router();
const rol = RolesController;

router.get("/", rol.listRoles);
router.put("/:id", rol.updateRol);
router.post("/", rol.createRoles);

export default router;
