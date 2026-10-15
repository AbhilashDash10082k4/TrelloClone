import type { RequestHandler } from "express";
import type { z } from "zod";
import { AppError } from "../errors/AppError";

export function validateBody(schema: z.ZodType): RequestHandler {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return next(
        new AppError(
          400,
          "VALIDATION_ERROR",
          "Request body is invalid",
          result.error.issues,
        ),
      );
    }

    res.locals.validatedBody = result.data;
    next();
  };
}

export function validateParams(schema: z.ZodType): RequestHandler {
  return (req, res, next) => {
    const result = schema.safeParse(req.params);

    if (!result.success) {
      return next(
        new AppError(
          400,
          "INVALID_PARAMETERS",
          "Route parameters are invalid",
          result.error.issues,
        ),
      );
    }

    res.locals.validatedParams = result.data;
    next();
  };
}

export function validateQuery(schema: z.ZodType): RequestHandler {
  return (req, res, next) => {
    const result = schema.safeParse(req.query);

    if (!result.success) {
      return next(
        new AppError(
          400,
          "INVALID_QUERY",
          "Query parameters are invalid",
          result.error.issues,
        ),
      );
    }

    res.locals.validatedQuery = result.data;
    next();
  };
}
