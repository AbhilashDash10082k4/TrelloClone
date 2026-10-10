import { Router } from "express";
import projectController from "./project.controller";
const router = Router();
router.get("/", projectController.getAllProjectsByOrg);
router.post("/", projectController.createProjectForOrg);
export default router;
