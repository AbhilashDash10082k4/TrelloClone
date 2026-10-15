import type { RequestHandler } from "express";
import { getAuth } from "@clerk/express";
import { AppError } from "../errors/AppError";
import userService from "../users/user.service";

export const requireUser: RequestHandler = async (req, res, next) => {
  const auth = getAuth(req); //retrieves the context of the req made by client (contains session token)

  if (!auth.isAuthenticated || !auth.userId) {
    return next(
      new AppError(401, "UNAUTHENTICATED", "Authentication is required"),
    );
  }
  const clerkUserId = auth.userId;
  const user = await userService.getAuthenticatedUser(clerkUserId);

  if (!user) {
    throw new AppError(
      409,
      "USER_PROFILE_NOT_SYNCED",
      "Your user profile is not ready yet",
    );
  }

  // Make both IDs available to later handlers
  res.locals.localUserId = user.id;

  /*auth.userId = contians authenticated clerk userId, clerk session
  res.locals.clerkUserId = Express object for storing request-specific data that later middleware and handlers can access*/
  res.locals.clerkUserId = clerkUserId;

  next();
};
