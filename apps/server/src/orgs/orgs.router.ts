import { Router } from "express";
import orgsController from "./orgs.controller";
import projectRoutes from "../projects/project.router";
import {
  createOrgSchema,
  deleteConfirmationSchema,
} from "../validation/schemas";
import { validateBody } from "../middleware/validate";
import { requireUser } from "../middleware/require-user";
import { requireOrgMember } from "../middleware/require-org-member";
import { requireOrgRole } from "../middleware/require-org-role";
import { writeLimiter } from "../middleware/rate-limit";
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
router.use(requireUser); // verify user and resolve their local record
router.get("/", orgsController.getAllOrgsForUser);
router.post(
  "/",
  writeLimiter,
  validateBody(createOrgSchema),
  orgsController.createOrg,
);

// All routes under /:orgId require membership.
// This also protects the nested project router mounted below.
router.use("/:orgId", requireOrgMember);
router.delete(
  "/:orgId",
  requireOrgRole("ADMIN"),
  validateBody(deleteConfirmationSchema),
  orgsController.deleteOrg,
);
router.get("/:orgId", orgsController.getOrgById); //requireOrgMember -> used in routes scoped to existing org
router.use("/:orgId/projects", projectRoutes); //project related functionalities should happen inside an org
export default router;
