import { createQuizSessions, createUserAnswers } from "./create";
import { db } from "./seed";

export const seedSessions = async (userId: string) => {
  // Delete all quiz sessions and user answer
  await db.userAnswer.deleteMany();
  await db.quizSession.deleteMany();
  console.log("\nQuiz sessions and user answers deleted");

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

  // Create user answers
  const userAnswers = await createUserAnswers();
  await db.$transaction(
    userAnswers.map((userAnswer) => db.userAnswer.create({ data: userAnswer })),
  );
  console.log("User Answer Created");
};
