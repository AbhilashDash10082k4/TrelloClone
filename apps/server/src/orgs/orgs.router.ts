import { Router } from "express";
import orgController from "./orgs.controller";
const router = Router();
router.get("/", orgController.getAllOrgs);
router.post("/", orgController.createOrg);
export default router;
