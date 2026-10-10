import { Router } from "express";
import orgsController from "./orgs.controller";
const router = Router({ mergeParams: true });

router.get("/", orgsController.getAllOrgs);
router.post("/", orgsController.createOrg);
router.get("/:orgId", orgsController.getOrgById);
router.get("/:orgId/projects", orgsController.getAllOrgProjects);
export default router;
