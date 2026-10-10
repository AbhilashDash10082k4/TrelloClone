import { Router } from "express";
import orgsController from "./orgs.controller";
const router = Router({ mergeParams: true });

router.get("/orgs", orgsController.getAllOrgs);
router.post("/org", orgsController.createOrg);

router.get("/:orgId/projects", orgsController.getAllOrgProjects);
export default router;
