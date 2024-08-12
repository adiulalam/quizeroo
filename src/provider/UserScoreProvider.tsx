import { useQuizTempUser } from "@/hooks";
import { createContext, useMemo, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";

type ScoreType = { currentScore: number; pendingScore: number };

type UserScoreContextType = {
  score: ScoreType;
  setScore: Dispatch<SetStateAction<ScoreType>>;
};

export const UserScoreContext = createContext<UserScoreContextType | undefined>(
  undefined,
);

export const UserScoreProvider = ({ children }: { children: ReactNode }) => {
  const { quizSession } = useQuizTempUser();

  const memoisedScore: ScoreType = useMemo(() => {
    if (!quizSession) return { currentScore: 0, pendingScore: 0 };

    const { currentQuestionId, userAnswers, showSubmission } = quizSession;

    if (showSubmission) {
      const currentScore = userAnswers.reduce(
        (accumulator, currentValue) => accumulator + currentValue.score,
        0,
      );

      return { currentScore, pendingScore: 0 };
    }

    const prevQuestionAnswers = userAnswers.filter(
      ({ questionId }) => questionId !== currentQuestionId,
    );

    const currentQuestionAnswers = userAnswers.filter(
      ({ questionId }) => questionId === currentQuestionId,
    );

    const currentScore = prevQuestionAnswers.reduce(
      (accumulator, currentValue) => accumulator + currentValue.score,
      0,
    );

    const pendingScore = currentQuestionAnswers.reduce(
      (accumulator, currentValue) => accumulator + currentValue.score,
      0,
    );

    return { currentScore, pendingScore };
  }, [quizSession]);

  const [score, setScore] = useState<ScoreType>(memoisedScore);

  return (
    <UserScoreContext.Provider
      value={{
        score,
        setScore,
      }}
    >
      {children}
    </UserScoreContext.Provider>
  );
};
