import { PrismaClient } from "@prisma/client";
import { seedQuizzes } from "./seedQuizzes";
import { seedSessions } from "./seedSessions";

export const db = new PrismaClient();

const main = async () => {
  const user = await db.user.findFirstOrThrow({
    where: { isTempUser: false },
  });

  await seedQuizzes(user.id);
  await seedSessions(user.id);
};

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
