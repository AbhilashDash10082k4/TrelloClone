import { Request, Response, NextFunction } from "express";
import projectService from "./project.service";
import { Temporal } from "temporal-polyfill";

export class ProjectController {
  async getAllProjectsByOrg(req: Request, res: Response) {
    // TODO: authenticate the user and verify org membership firs
    try {
      const { orgId } = req.params;
      const projects = await projectService.getAllProjectsByOrg(
        orgId as string,
      );
      res.status(200).json({ success: true, data: projects });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  async createProjectForOrg(req: Request, res: Response) {
    try {
      // TODO: authenticate the user and verify org membership firs
      const { title, description, startDate, endDate } = req.body;
      const data = {
        title,
        description,
        startDate: Temporal.Instant.from(startDate),
        endDate: Temporal.Instant.from(endDate),
      };
      const { orgID } = req.params;
      if (typeof title !== "string" || !title.trim()) {
        return res.status(400).json({
          message: "title is required",
        });
      }
      const project = await projectService.createProjectForOrg(
        orgID as string,
        data,
      );
      res.status(201).json({ message: project });
    } catch (error: any) {
      res
        .status(400)
        .json({ message: `Error creating project: ${error.message}` });
    }
  }
}
export default new ProjectController();
