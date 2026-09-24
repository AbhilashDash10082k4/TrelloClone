import { db } from "./db";

const users = [
  { email: "alice@example.com", name: "Alice" },
  { email: "bob@example.com", name: "Bob" },
  { email: "charlie@example.com", name: "Charlie" },
];

for (const user of users) {
  await db.orm.public.User.upsert({
    create: user,
    update: {},
    conflictOn: { email: user.email },
  });
}

console.log(`Seeded ${users.length} users.`);
await db.close();
