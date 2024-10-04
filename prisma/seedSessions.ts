import _ from "lodash";
import { createQuizSessions, createUserAnswers } from "./create";
import { db } from "./seed";

export const seedSessions = async (userId: string) => {
  // Delete all quiz sessions, user answers, and user quiz sessions
  await db.userQuizSession.deleteMany();
  await db.userAnswer.deleteMany();
  await db.quizSession.deleteMany();
  console.log("\nUser quiz sessions, quiz sessions, and user answers deleted");

  // Delete all temp users
  await db.user.deleteMany({ where: { isTempUser: true } });
  console.log("Temp users deleted");

  // Create quiz sessions
  const quizSessions = await createQuizSessions(userId);
  await db.$transaction(
    quizSessions.map((quizSession) =>
      db.quizSession.create({ data: quizSession }),
    ),
  );
  console.log("Quiz Sessions Created");

  // Create user answers and user quiz sessions
  const userAnswers = await createUserAnswers();
  const userQuizSessions = _.uniqBy(
    userAnswers.map((userAnswer) => ({
      userId: userAnswer.userId,
      quizSessionId: userAnswer.quizSessionId,
    })),
    (entry) => `${entry.userId}-${entry.quizSessionId}`,
  );

  // Create user quiz sessions
  await db.$transaction(
    userQuizSessions.map((uqs) =>
      db.userQuizSession.create({
        data: {
          userId: uqs.userId,
          quizSessionId: uqs.quizSessionId,
        },
      }),
    ),
  );
  console.log("User Quiz Sessions Created");

  // Create user answers
  await db.$transaction(
    userAnswers.map((userAnswer) => db.userAnswer.create({ data: userAnswer })),
  );
  console.log("User Answer Created");
};
