import { db } from "@repo/db";
import { Temporal } from "temporal-polyfill";

interface DTO {
  name: string;
  description?: string;
}
export class OrgService {
  async getAllOrgs() {
    return db.orm.public.Org.all();
  }
  async createOrg(data: DTO) {
    return db.orm.public.Org.create({
      name: data.name,
      description: data.description,
    });
  }
}
export default new OrgService();
