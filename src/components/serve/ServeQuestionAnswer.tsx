import { useCurrentQuestion, useQuizSession } from "@/hooks";
import { AnswerButton } from "../ui/AnswerButton";
import { answerMap } from "@/utils/constants";
import { cn } from "@/utils/theme";

export const ServeQuestionAnswer = () => {
  const { currentQuestion } = useCurrentQuestion();
  const { showSubmission } = useQuizSession();

  return (
    <div className="flex h-full w-full flex-wrap">
      {currentQuestion?.answers.map((answer, index) => (
        <div key={answer.id} className="flex w-1/2 flex-grow p-2">
          <AnswerButton
            className={cn(
              "flex h-full w-full flex-col gap-2 sm:flex-row",
              !answer.isCorrect && showSubmission && "opacity-50",
            )}
            iconClassName="size-10 sm:size-14"
            variant={answerMap[String(index)]}
            showAnswer={
              showSubmission ? { isCorrectAnswer: answer.isCorrect } : undefined
            }
          >
            <h2 className="max-w-[80%] scroll-m-20 whitespace-normal text-center text-lg font-bold tracking-tight first:mt-0 sm:text-3xl">
              {answer.name}
            </h2>
          </AnswerButton>
        </div>
      ))}
    </div>
  );
};
