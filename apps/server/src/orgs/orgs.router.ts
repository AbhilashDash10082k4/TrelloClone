import { Router } from "express";
import orgsController from "./orgs.controller";
import projectRoutes from "../projects/project.router";
const router = Router({ mergeParams: true });

router.get("/", orgsController.getAllOrgs);
router.post("/", orgsController.createOrg);
router.get("/:orgId", orgsController.getOrgById);
router.use("/projects", projectRoutes); //project related functionalities should happen inside an org
export default router;
