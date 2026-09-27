import { Request, Response, NextFunction } from "express";
import projectService from "./project.service";
interface Params {
  req: Request;
  res: Response;
}
export class ProjectController {
  async getAllProjects({ req, res }: Params) {
    try {
      const projects = await projectService.getAllProjects();
      res.status(200).json({ success: true, data: projects });
    } catch (error) {
      res.json({ message: error });
    }
  }

  async createProject({ req, res }: Params) {
    const { title, description, startDate, endDate } = req.body;
    const data = { title, description, startDate, endDate };
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
