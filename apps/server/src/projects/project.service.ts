import { db } from "@repo/db";
import { Temporal } from "temporal-polyfill";
import { AppError } from "../errors/AppError";

interface ProjectDTO {
  title: string;
  description: string;
  startDate?: Temporal.Instant | null;
  endDate?: Temporal.Instant | null;
}
export class ProjectService {
  async createProjectForOrg(orgId: string, data: ProjectDTO) {
    return db.orm.public.Project.create({
      title: data.title,
      description: data.description,
      startDate: data.startDate,
      endDate: data.endDate,
      org: (org) => org.connect({ id: orgId }), //relation b/w proj and orgs
    });
  }

  async getProjectById(orgId: string, projectId: string) {
    //single project belonging to single org
    const projects = await db.orm.public.Project.where({
      id: projectId,
      orgId,
    }).all();

    return projects[0] ?? null;
  }

  async getAllProjectsByOrg(orgId: string) {
    return db.orm.public.Project.where({ orgId }).all();
  }
  async deleteProject(orgId: string, projectId: string, confirmName: string) {
    return db.transaction(async (tx) => {
      const projects = await tx.orm.public.Project.where({
        id: projectId,
        orgId,
      }).all();

      const project = projects[0];

      if (!project) {
        throw new AppError(
          404,
          "PROJECT_NOT_FOUND",
          "Project not found in this organization",
        );
      }

      if (project.title !== confirmName.trim()) {
        throw new AppError(
          400,
          "CONFIRMATION_MISMATCH",
          "The project title does not match",
        );
      }

      const boards = await tx.orm.public.Board.where({ projectId }).all();

      for (const board of boards) {
        const sections = await tx.orm.public.Section.where({
          boardId: board.id,
        }).all();

        for (const section of sections) {
          await tx.orm.public.Task.where({ sectionId: section.id }).deleteAll();
        }
      }

      const deleted = await tx.orm.public.Project.where({
        id: projectId,
        orgId,
      }).delete();

      if (!deleted) {
        throw new AppError(
          404,
          "PROJECT_NOT_FOUND",
          "Project not found in this organization",
        );
      }

      return { id: deleted.id, title: deleted.title };
    });
  }
}
export default new ProjectService();
