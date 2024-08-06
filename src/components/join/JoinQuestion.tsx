import { useCurrentQuestion, useQuizTempUser } from "@/hooks";
import { ServeHeaderQuestion, ServeQuestionAnswer } from "../serve";
import { api } from "@/utils/api";
import { useState } from "react";
import { JoinQuestionSubmitted } from ".";

export const JoinQuestion = () => {
  const { quizSessionId, quizSession } = useQuizTempUser();
  const { currentQuestionId } = useCurrentQuestion();

  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(
    !!(
      quizSession?.question?.userAnswers &&
      quizSession.question.userAnswers.length > 0
    ),
  );

  const { mutate } = api.userAnswer.createUserAnswer.useMutation({
    onSuccess: () => {
      setIsAnswerSubmitted(true);
    },
  });

  const onClickHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const answerId = e.currentTarget.id;
    if (!quizSessionId || !currentQuestionId || !answerId) return;

    mutate({ answerId, quizSessionId, questionId: currentQuestionId });
  };

  return (
    <div className="flex h-full w-full flex-col gap-2">
      <div className="flex max-h-32 w-full justify-center gap-2 bg-secondary p-2">
        <ServeHeaderQuestion />
      </div>
      {isAnswerSubmitted ? (
        <JoinQuestionSubmitted />
      ) : (
        <ServeQuestionAnswer onClick={onClickHandler} />
      )}
    </div>
  );
};
