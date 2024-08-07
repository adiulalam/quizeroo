import { useCurrentQuestion, useQuizTempUser } from "@/hooks";
import { ServeQuestionAnswer } from "../serve";
import { api } from "@/utils/api";
import { useAnswerSubmitted } from "@/hooks/useAnswerSubmitted";

export const JoinQuestionAnswer = () => {
  const { quizSessionId } = useQuizTempUser();
  const { currentQuestionId } = useCurrentQuestion();
  const { setIsAnswerSubmitted } = useAnswerSubmitted();

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

  return <ServeQuestionAnswer onClick={onClickHandler} />;
};
