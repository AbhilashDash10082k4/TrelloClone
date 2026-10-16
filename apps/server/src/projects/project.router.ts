import { Router } from "express";
import projectController from "./project.controller";
import { validateBody, validateParams } from "../middleware/validate";
import {
  createProjectSchema,
  deleteConfirmationSchema,
  projectParamsSchema,
} from "../validation/schemas";
import { writeLimiter } from "../middleware/rate-limit";
import { requireOrgRole } from "../middleware/require-org-role";

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
router.delete(
  "/:projectId",
  requireOrgRole("ADMIN"),
  validateBody(deleteConfirmationSchema),
  projectController.deleteProject,
);
export default router;
