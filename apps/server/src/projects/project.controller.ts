import { Request, Response, NextFunction } from "express";
import projectService from "./project.service";
import { Temporal } from "temporal-polyfill";
interface Params {
  req: Request;
  res: Response;
}
export class ProjectController {
  async getAllProjects(req: Request, res: Response) {
    try {
      const projects = await projectService.getAllProjects();
      res.status(200).json({ success: true, data: projects });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  async createProject(req: Request, res: Response) {
    const { title, description, startDate, endDate, orgId } = req.body;
    const data = {
      title,
      description,
      startDate: Temporal.Instant.from(startDate),
      endDate: Temporal.Instant.from(endDate),
      orgId,
    };
    try {
      const newProject = await projectService.createProject(data);
      res.status(201).json({ message: data });
    } catch (error: any) {
      res
        .status(400)
        .json({ message: `Error creating project: ${error.message}` });
    }
  }
}
export default new ProjectController();
