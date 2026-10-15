import { Router } from "express";
import projectController from "./project.controller";
import { validateBody, validateParams } from "../middleware/validate";
import {
  createProjectSchema,
  projectParamsSchema,
} from "../validation/schemas";
import { writeLimiter } from "../middleware/rate-limit";

const router = Router({ mergeParams: true });

router.get("/", projectController.getAllProjectsByOrg);
router.post(
  "/",
  writeLimiter,
  validateBody(createProjectSchema),
  projectController.createProjectForOrg,
);
router.get(
  "/:projectId",
  validateParams(projectParamsSchema),
  projectController.getProjectById,
);

export default router;
