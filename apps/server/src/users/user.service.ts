import { db } from "@repo/db";

export class UserService {
  async getByClerkId(clerkUserId: string) {
    const users = await db.orm.public.User.where({ clerkUserId }).all();

    return users[0] ?? null;
  }
}

export default new UserService();
