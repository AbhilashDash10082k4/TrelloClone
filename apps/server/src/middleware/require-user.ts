import type { RequestHandler } from "express";
import { getAuth } from "@clerk/express";
import { AppError } from "../errors/AppError";

export const requireUser: RequestHandler = (req, res, next) => {
  const auth = getAuth(req); //retrieves the context of the req made by client (contains session token)

  if (!auth.isAuthenticated || !auth.userId) {
    return next(
      new AppError(401, "UNAUTHENTICATED", "Authentication is required"),
    );
  }

  res.locals.clerkUserId = auth.userId; //contians authenticated clerk userId
  next();
};
