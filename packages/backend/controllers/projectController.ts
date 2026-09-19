import { PrismaClient } from "@repo/db";

const prisma = new PrismaClient();

export const getProjects = async () => {
  return await prisma.project.findMany();
};
