import { useCurrentQuestion, useQuizTempUser } from "@/hooks";
import { ServeHeaderQuestion, ServeQuestionAnswer } from "../serve";

export const JoinQuestion = () => {
  const { quizSessionId } = useQuizTempUser();
  const { currentQuestionId } = useCurrentQuestion();

  const onClickHandler = (answerId: string) => {
    if (!quizSessionId || !currentQuestionId) return;
    console.log("🚀 ~ onClickHandler ~ id:", answerId);
  };

  return (
    <div className="flex h-full w-full flex-col gap-2">
      <div className="flex max-h-32 w-full justify-center gap-2 bg-secondary p-2">
        <ServeHeaderQuestion />
      </div>
      <ServeQuestionAnswer onClickHandler={onClickHandler} />
    </div>
  );
};
