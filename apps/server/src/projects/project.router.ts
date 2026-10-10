import { Router } from "express";
import projectController from "./project.controller";

const router = Router({ mergeParams: true });
router.get("/", projectController.getAllProjectsByOrg);
router.post("/", projectController.createProjectForOrg);
router.get("/:projectId", projectController.getProjectById);

export default router;
