import type { RequestHandler } from "express";
import { AppError } from "../errors/AppError";

type OrgRole = "ADMIN" | "MEMBER";

export function requireOrgRole(...allowedRoles: OrgRole[]): RequestHandler {
  return (req, res, next) => {
    const membership = res.locals.orgMembership;

    if (!membership) {
      return next(new AppError(
        500,
        "MISSING_MEMBERSHIP_CONTEXT",
        "Organization membership was not resolved",
      ));
    }

    if (!allowedRoles.includes(membership.role)) {
      return next(new AppError(
        403,
        "INSUFFICIENT_ROLE",
        "You do not have permission to perform this action",
      ));
    }

    next();
  };
}