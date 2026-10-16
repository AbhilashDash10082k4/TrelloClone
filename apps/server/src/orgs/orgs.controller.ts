import { Request, Response, NextFunction } from "express";
import orgService from "./orgs.service";
import {
  createOrgSchema,
  deleteConfirmationSchema,
} from "../validation/schemas";
import z from "zod";
import { AppError } from "../errors/AppError";

export class OrgController {
  async createOrg(req: Request, res: Response, next: NextFunction) {
    try {
      //req from frontend
      const data = res.locals.validatedBody as z.infer<typeof createOrgSchema>;

      const userId = res.locals.localUserId as string;
      if (!userId) {
        return res.status(404).json({
          error: {
            code: "USER_NOT_FOUND",
            message: "User not found",
          },
        });
      }
      const org = await orgService.createOrg(userId, data);
      res.status(201).json({ data: org });
    } catch (error) {
      return next(error);
    }
  }
  async getOrgById(req: Request, res: Response, next: NextFunction) {
    try {
      const { orgId } = req.params;

      if (!orgId) {
        return res.status(400).json({
          error: {
            code: "INVALID_ORG_ID",
            message: "Organization ID is required",
          },
        });
      }

      const org = await orgService.getOrgById(orgId as string);

      if (!org) {
        return res.status(404).json({
          error: {
            code: "ORG_NOT_FOUND",
            message: "Organization not found",
          },
        });
      }

      return res.status(200).json({ data: org });
    } catch (error) {
      return next(error);
    }
  }
  async getAllOrgsForUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = res.locals.localUserId as string;
      const orgs = await orgService.getAllOrgsForUser(userId);
      if (!orgs) {
        return res.status(404).json({
          error: {
            code: "ORG_NOT_FOUND",
            message: "Organizations for user not found",
          },
        });
      }
      res.status(200).json({ success: true, data: orgs });
    } catch (error) {
      return next(error);
    }
  }
  async deleteOrg(req: Request, res: Response, next: NextFunction) {
    try {
      const orgId = req.params.orgId;

      if (typeof orgId !== "string") {
        throw new AppError(
          400,
          "INVALID_ORG_ID",
          "A valid organization ID is required",
        );
      }

      const userId = res.locals.localUserId as string;
      const { confirmName } = res.locals.validatedBody as z.infer<
        typeof deleteConfirmationSchema
      >;

      const deleted = await orgService.deleteOrg(orgId, userId, confirmName);

      return res.status(200).json({
        data: deleted,
        message: "Organization deleted",
      });
    } catch (error) {
      return next(error);
    }
  }
}
export default new OrgController();
