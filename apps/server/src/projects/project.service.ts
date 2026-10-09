import { db } from "@repo/db";
import { Temporal } from "temporal-polyfill";

interface DTO {
  title: string;
  description: string;
  startDate: Temporal.Instant;
  endDate: Temporal.Instant;
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
    });
  }
}
export default new ProjectService();
