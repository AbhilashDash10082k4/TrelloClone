import { Router } from "express";
import projectController from "./project.controller";
import { validateBody } from "../middleware/validate";
import { createProjectSchema } from "../validation/schemas";
import { requireOrgMember } from "../middleware/require-org-member";

const router = Router({ mergeParams: true });
router.use(requireOrgMember);

router.get("/", projectController.getAllProjectsByOrg);
router.post(
  "/",
  validateBody(createProjectSchema),
  projectController.createProjectForOrg,
);
router.get("/:projectId", projectController.getProjectById);

export default router;
