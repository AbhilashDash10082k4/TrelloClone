import { z } from "zod";

const optionalDate = z.string().datetime({ offset: true }).optional();

export const createOrgSchema = z
  .object({
    name: z.string().trim().min(1).max(120),
    description: z.string().trim().max(2000),
  })
  .strict();

export const createProjectSchema = z
  .object({
    title: z.string().trim().min(1).max(200),
    description: z.string().trim().max(2000),
    startDate: optionalDate,
    endDate: optionalDate,
  })
  .strict()
  .superRefine((data, ctx) => {
    if (
      data.startDate &&
      data.endDate &&
      Date.parse(data.endDate) < Date.parse(data.startDate)
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["endDate"],
        message: "endDate must be on or after startDate",
      });
    }
  });
