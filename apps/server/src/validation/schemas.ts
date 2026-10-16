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
export const orgParamsSchema = z.object({
  orgId: z.string().min(1).max(100),
});

export const projectParamsSchema = z.object({
  orgId: z.string().min(1).max(100),
  projectId: z.string().min(1).max(100),
});

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const deleteConfirmationSchema = z
  .object({
    confirmName: z.string().trim().min(1).max(200),
  })
  .strict();
