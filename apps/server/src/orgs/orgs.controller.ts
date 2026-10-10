import { Request, Response, NextFunction } from "express";
import orgService from "./orgs.service";
import { Temporal } from "temporal-polyfill";

export class OrgController {
  async getAllOrgs(req: Request, res: Response) {
    try {
      const orgs = await orgService.getAllOrgs();
      res.status(200).json({ success: true, data: orgs });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  async createOrg(req: Request, res: Response) {
    const { name, description } = req.body;
    const data = { name, description };
    try {
      await orgService.createOrg(data);
      res.status(201).json({ message: data });
    } catch (error: any) {
      res
        .status(400)
        .json({ message: `Error creating project: ${error.message}` });
    }
  }
  async getAllOrgProjects(req: Request, res: Response) {
    try {
      const { orgId } = req.params;
      const projects = await orgService.getAllOrgProjects(orgId as string);
      return res.status(200).json({ success: true, data: projects });
    } catch {
      return res
        .status(500)
        .json({ message: "Failed to fetch organization projects" });
    }
  }
}
export default new OrgController();
