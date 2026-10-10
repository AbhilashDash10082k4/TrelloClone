import { Router } from "express";
import projectController from "./project.controller";

const router = Router({ mergeParams: true });
router.get("/:orgId", projectController.getAllProjectsByOrg);
router.post("/:orgId", projectController.createProjectForOrg);
router.get("/:orgid/:projectId", projectController.getProjectById);

export default router;
