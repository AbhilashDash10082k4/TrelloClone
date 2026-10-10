import { db } from "@repo/db";
import { Temporal } from "temporal-polyfill";

interface ProjectDTO {
  title: string;
  description: string;
  startDate: Temporal.Instant;
  endDate: Temporal.Instant;
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
}
export default new ProjectService();
