import { Router } from "express";
import projectService from "./project.service";
const router = Router();
router.get("/", projectService.getAllProjects);
router.post("/", projectService.createProject);
export default router;
