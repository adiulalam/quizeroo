import { createQuizzes, createQuestions, createAnswers } from "./create";
import { db } from "./seed";

const limit = { quiz: 50, question: 10, answer: 4 };

export const seedQuizzes = async (userId: string) => {
  // Delete all quizzes, questions and answers
  await db.answer.deleteMany();
  await db.question.deleteMany();
  await db.quiz.deleteMany();
  console.log("Quizzes, questions and answers deleted");

  // Create X quizzes
  const quizzes = await db.$transaction(
    createQuizzes(userId, limit.quiz).map((quiz) =>
      db.quiz.create({ data: quiz }),
    ),
  );
  console.log("Quizzes Created");

  // Each quiz has X questions
  const quizzesQuestions = quizzes.flatMap((quiz) =>
    createQuestions(quiz.id, limit.question).map((question) =>
      db.question.create({ data: question }),
    ),
  );
  const questions = await db.$transaction(quizzesQuestions);
  console.log("Questions Created");

  // Each question has X answers
  const questionsOptions = questions.flatMap((question) =>
    createAnswers(question.id, limit.answer).map((answer) =>
      db.answer.create({ data: answer }),
    ),
  );

  const answers = await db.$transaction(questionsOptions);
  console.log("Answers Created", answers.length);

  return answers;
};
