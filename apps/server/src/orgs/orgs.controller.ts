import { Request, Response, NextFunction } from "express";
import orgService from "./orgs.service";
import { Temporal } from "temporal-polyfill";
import { createOrgSchema } from "../validation/schemas";
import z from "zod";

export class OrgController {
  async createOrg(req: Request, res: Response) {
    //req from frontend
    const data = res.locals.validatedBody as z.infer<typeof createOrgSchema>;

    const userId = res.locals.localUserId as string;

    try {
      await orgService.createOrg(userId, data);
      res.status(201).json({ message: data });
    } catch (error: any) {
      res
        .status(400)
        .json({ message: `Error creating project: ${error.message}` });
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
  async getAllOrgsForUser(req: Request, res: Response) {
    try {
      const userId = res.locals.localUserId as string;
      const orgs = await orgService.getAllOrgsForUser(userId);
      res.status(200).json({ success: true, data: orgs });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
}
export default new OrgController();
