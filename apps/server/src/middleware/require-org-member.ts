import type { RequestHandler } from "express";
import { db } from "@repo/db";
import userService from "../users/user.service";
import { AppError } from "../errors/AppError";

export const requireOrgMember: RequestHandler<{ orgId: string }> = async (
  req,
  res,
  next,
) => {
  try {
    const { orgId } = req.params;
    const localUserId = res.locals.localUserId as string | undefined;
    if (!orgId) {
      throw new AppError(400, "INVALID_ORG_ID", "Organization ID is required");
    }

    if (!orgId || !localUserId) {
      throw new AppError(
        400,
        "INVALID_PARAMETERS",
        "Organization ID is required",
      );
    }

    const memberships = await db.orm.public.OrgMember.where({
      userId: localUserId,
      orgId,
    }).all();

    if (memberships.length === 0) {
      throw new AppError(
        403,
        "ORG_ACCESS_DENIED",
        "You do not have access to this organization",
      );
    }

    //res.locals -> Express object that stores req data required by other middlewares
    res.locals.orgMembership = memberships[0];
    next();
  } catch (error) {
    next(error);
  }
};
