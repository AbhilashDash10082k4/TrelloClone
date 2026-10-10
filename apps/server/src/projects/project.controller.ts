import { Request, Response, NextFunction } from "express";
import projectService from "./project.service";
import { Temporal } from "temporal-polyfill";

export class ProjectController {
  async createProjectForOrg(req: Request, res: Response) {
    try {
      // TODO: authenticate the user and verify org membership first

      const { title, description, startDate, endDate } = req.body;
      const data = {
        title,
        description,
        startDate: Temporal.Instant.from(startDate),
        endDate: Temporal.Instant.from(endDate),
      };
      const { orgId, projectId } = req.params;
      if (typeof title !== "string" || !title.trim()) {
        return res.status(400).json({
          message: "title is required",
        });
      }
      const project = await projectService.createProjectForOrg(
        orgId as string,
        data,
      );
      res.status(201).json({ message: project });
    } catch (error: any) {
      res
        .status(400)
        .json({ message: `Error creating project: ${error.message}` });
    }
  }
  async getProjectById(req: Request, res: Response, next: NextFunction) {
    try {
      const { orgId, projectId } = req.params;
      const project = await projectService.getProjectById(
        orgId as string,
        projectId as string,
      );
      if (!orgId || !projectId) {
        return res.status(400).json({
          error: {
            code: "INVALID_PARAMETERS",
            message: "Organization ID and project ID are required",
          },
        });
      }
      if (!project) {
        return res.status(404).json({
          error: {
            code: "PROJECT_NOT_FOUND",
            message: "Project not found in this organization",
          },
        });
      }
      return res.status(200).json({ data: project });
    } catch (error) {
      return next(error);
    }
  }
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
}
export default new ProjectController();
