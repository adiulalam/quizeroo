import {
  useCurrentQuestion,
  useQuestionCountdown,
  useQuizTempUser,
} from "@/hooks";
import { ServeQuestionAnswer } from "../serve";
import { api } from "@/utils/api";
import { useAnswerSubmitted } from "@/hooks/useAnswerSubmitted";

export const JoinQuestionAnswer = () => {
  const { quizSessionId } = useQuizTempUser();
  const { currentQuestionId } = useCurrentQuestion();
  const { setIsAnswerSubmitted, setIsAnswerCorrect } = useAnswerSubmitted();
  const { counter } = useQuestionCountdown();

  const { mutate } = api.userAnswer.createUserAnswer.useMutation({
    onSuccess: (data) => {
      setIsAnswerSubmitted(true);
      setIsAnswerCorrect(data.answer.isCorrect);
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
    <ServeQuestionAnswer onClick={onClickHandler} disabled={counter <= 0} />
  );
};
