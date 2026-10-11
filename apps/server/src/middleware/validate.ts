import type { RequestHandler } from "express";
import type { z } from "zod";
import { AppError } from "../errors/AppError";

export const validateBody =
  (schema: z.ZodType): RequestHandler =>
  (req, res, next) => {
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
