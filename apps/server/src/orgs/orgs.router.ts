import { Router } from "express";
import orgsController from "./orgs.controller";
import projectRoutes from "../projects/project.router";
import { createOrgSchema } from "../validation/schemas";
import { validateBody } from "../middleware/validate";
import { requireUser } from "../middleware/require-user";
/**
 * @openapi
 * /orgs:
 *   post:
 *     summary: Create an organization
 *     security:
 *       - ClerkBearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Organization created
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Authentication required
 */
const router = Router({ mergeParams: true });
router.use(requireUser);
router.get("/", orgsController.getAllOrgsForUser);
router.post("/", validateBody(createOrgSchema), orgsController.createOrg);
router.get("/:orgId", orgsController.getOrgById);
router.use("/:orgId/projects", projectRoutes); //project related functionalities should happen inside an org
export default router;
