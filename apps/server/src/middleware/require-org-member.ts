import type { RequestHandler } from "express";
import { db } from "@repo/db";
import userService from "../users/user.service";
import { AppError } from "../errors/AppError";

export const requireOrgMember: RequestHandler = async (req, res, next) => {
  try {
    const { orgId } = req.params;
    const clerkUserId = res.locals.clerkUserId as string;

    if (!orgId) {
      throw new AppError(400, "INVALID_ORG_ID", "Organization ID is required");
    }

    const user = await userService.getByClerkId(clerkUserId);

    if (!user) {
      throw new AppError(
        409,
        "USER_PROFILE_NOT_SYNCED",
        "User profile is not ready",
      );
    }

    const memberships = await db.orm.public.OrgMember.where({
      userId: user.id,
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
    res.locals.localUserId = user.id; //store localId given by the DB
    res.locals.orgMembership = memberships[0];
    next();
  } catch (error) {
    next(error);
  }
};
