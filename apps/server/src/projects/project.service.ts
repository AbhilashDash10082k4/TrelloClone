import { db } from "@repo/db";

interface DTO {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  orgId: string;
}
export class ProjectService {
  async getAllProjects() {
    return db.orm.public.Project.all();
  }
  async createProject(data: DTO) {
    return db.orm.public.Project.create({
      title: data.title,
      description: data.description,
      startDate: data.startDate,
      endDate: data.endDate,
      orgId: data.orgId,
    });
  }
}
export default new ProjectService();
