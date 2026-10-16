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
  async deleteOrg(orgId: string, userId: string, confirmName: string) {
    return db.transaction(async (tx) => {
      // Defense in depth: only an organization admin may delete it.
      const memberships = await tx.orm.public.OrgMember.where({
        orgId,
        userId,
      }).all();

      const membership = memberships[0];

      if (!membership) {
        throw new AppError(
          403,
          "ORG_ACCESS_DENIED",
          "You do not have access to this organization",
        );
      }

      if (membership.role !== "ADMIN") {
        throw new AppError(
          403,
          "INSUFFICIENT_ROLE",
          "Only organization admins can delete this organization",
        );
      }

      const orgs = await tx.orm.public.Org.where({ id: orgId }).all();

      const org = orgs[0];

      if (!org) {
        throw new AppError(404, "ORG_NOT_FOUND", "Organization not found");
      }

      if (org.name !== confirmName.trim()) {
        throw new AppError(
          400,
          "CONFIRMATION_MISMATCH",
          "The organization name does not match",
        );
      }

      // Task.section uses onDelete: Restrict, so remove tasks first.
      const projects = await tx.orm.public.Project.where({ orgId }).all();

      for (const project of projects) {
        const boards = await tx.orm.public.Board.where({
          projectId: project.id,
        }).all();

        for (const board of boards) {
          const sections = await tx.orm.public.Section.where({
            boardId: board.id,
          }).all();

          for (const section of sections) {
            await tx.orm.public.Task.where({
              sectionId: section.id,
            }).deleteAll();
          }
        }
      }

      const deleted = await tx.orm.public.Org.where({ id: orgId }).delete();

      if (!deleted) {
        throw new AppError(404, "ORG_NOT_FOUND", "Organization not found");
      }

      return {
        id: deleted.id,
        name: deleted.name,
      };
    });
  }
}
export default new OrgService();
