import { db } from "@repo/db";
import { AppError } from "../errors/AppError";

interface OrgDTO {
  name: string;
  description: string;
}
export class OrgService {
  async createOrg(userId: string, data: OrgDTO) {
    return db.transaction(async (tx) => {
      const org = await tx.orm.public.Org.create({
        name: data.name,
        description: data.description ?? null,
      });

      await tx.orm.public.OrgMember.create({
        role: "ADMIN",
        user: (user) => user.connect({ id: userId }),
        org: (relation) => relation.connect({ id: org.id }),
      });

      return org;
    });
  }
  async getOrgById(orgId: string) {
    const orgs = await db.orm.public.Org.where({ id: orgId }).all();

    return orgs[0] ?? null;
  }
  //gets org memberships about a single user and not all the memberships records
  async getAllOrgsForUser(userId: string) {
    const memberships = await db.orm.public.OrgMember.where({ userId })
      .include("org")
      .all();
    return memberships.map((membership) => membership.org);
  }
}
export default new OrgService();
