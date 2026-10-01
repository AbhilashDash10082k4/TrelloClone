import { Router } from "express";
import projectController from "./project.controller";
const router = Router();
router.get("/", projectController.getAllProjects);
router.post("/", projectController.createProject);
export default router;
