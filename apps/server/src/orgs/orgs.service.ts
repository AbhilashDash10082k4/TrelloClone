import { db } from "@repo/db";

interface DTO {
  name: string;
  description?: string;
}
export class OrgService {
  async createOrg(data: DTO) {
    return db.orm.public.Org.create({
      name: data.name,
      description: data.description,
    });
  }
  async getOrgById(orgId: string) {
    const orgs = await db.orm.public.Org.where({ id: orgId }).all();

    return orgs[0] ?? null;
  }
  async getAllOrgs() {
    return db.orm.public.Org.all();
  }
  async getAllOrgProjects(orgId: string) {
    return db.orm.public.Project.where({ orgId }).all();
  }
}
export default new OrgService();
