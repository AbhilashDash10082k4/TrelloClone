import { Request, Response, NextFunction } from "express";
import projectService from "./project.service";
import { Temporal } from "temporal-polyfill";
import { createProjectSchema } from "../validation/schemas";
import z from "zod";
import { AppError } from "../errors/AppError";

export class ProjectController {
  async createProjectForOrg(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, description, startDate, endDate } = res.locals
        .validatedBody as z.infer<typeof createProjectSchema>;
      const data = {
        title,
        description,
        startDate: startDate ? Temporal.Instant.from(startDate) : null,
        endDate: endDate ? Temporal.Instant.from(endDate) : null,
      };
      const { orgId } = req.params;
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
      return next(error);
    }
  }
  async getProjectById(req: Request, res: Response, next: NextFunction) {
    try {
      const { orgId, projectId } = res.locals.validatedParams;
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
  async getAllProjectsByOrg(req: Request, res: Response, next: NextFunction) {
    // TODO: authenticate the user and verify org membership firs
    try {
      const { orgId } = req.params;
      const projects = await projectService.getAllProjectsByOrg(
        orgId as string,
      );
      if (!projects) {
        return next(
          new AppError(404, "PROJECT_UNAVAILABLE", "No projects, create one"),
        );
      }
      res.status(200).json({ success: true, data: projects });
    } catch (error) {
      return next(error);
    }
  }
}
export default new ProjectController();
