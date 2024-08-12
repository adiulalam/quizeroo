import {
  useCurrentQuestion,
  useQuestionCountdown,
  useQuizTempUser,
  useUserScore,
} from "@/hooks";
import { ServeQuestionAnswer } from "../serve";
import { api } from "@/utils/api";
import { useAnswerSubmitted } from "@/hooks/useAnswerSubmitted";
import { calculateScore } from "@/utils/functions";

export const JoinQuestionAnswer = () => {
  const { quizSessionId } = useQuizTempUser();
  const { currentQuestion } = useCurrentQuestion();
  const { setIsAnswerSubmitted, setIsAnswerCorrect } = useAnswerSubmitted();
  const { setScore } = useUserScore();
  const { counter } = useQuestionCountdown();

  const { mutate } = api.userAnswer.createUserAnswer.useMutation({
    onSuccess: (data) => {
      setIsAnswerSubmitted(true);
      setIsAnswerCorrect(data.answer.isCorrect);
      setScore((prev) => ({ ...prev, pendingScore: data.score }));
    },
  });

  const onClickHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const answerId = e.currentTarget.id;
    const answer = currentQuestion?.answers.find(({ id }) => id === answerId);

    if (!quizSessionId || !answer || !currentQuestion) return;

    const score = calculateScore({
      currentCounter: counter,
      maxCounter: currentQuestion.countdown,
      isCorrect: !!answer.isCorrect,
    });

    mutate({
      quizSessionId,
      score,
      answerId: answer.id,
      questionId: currentQuestion.id,
    });
  };

  return (
    <ServeQuestionAnswer onClick={onClickHandler} disabled={counter <= 0} />
  );
};
