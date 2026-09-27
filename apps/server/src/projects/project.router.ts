import { Router } from "express";
import projectService from "./project.service";
const router = Router();
router.get("/projects", projectService.getAllProjects);
router.post("/projects", projectService.createProject);
export default router;
