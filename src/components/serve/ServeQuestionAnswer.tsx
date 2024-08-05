import { useCurrentQuestion } from "@/hooks";
import { AnswerButton } from "../ui/AnswerButton";
import { answerMap } from "@/utils/constants";
import { cn } from "@/utils/theme";
import { H2 } from "../ui/Typography";

export const ServeQuestionAnswer = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
) => {
  const { currentQuestion, showSubmission } = useCurrentQuestion();

  return (
    <div className="flex h-full w-full flex-wrap">
      {currentQuestion?.answers.map((answer, index) => (
        <div key={answer.id} className="flex w-1/2 flex-grow p-2">
          <AnswerButton
            id={answer.id}
            className={cn(
              "flex h-full w-full flex-col gap-2 sm:flex-row",
              !answer.isCorrect && showSubmission && "opacity-50",
            )}
            iconClassName="size-10 sm:size-14"
            variant={answerMap[String(index)]}
            showAnswer={
              showSubmission ? { isCorrectAnswer: answer.isCorrect } : undefined
            }
            {...props}
          >
            <H2 className="max-w-[80%] text-center font-bold">{answer.name}</H2>
          </AnswerButton>
        </div>
      ))}
    </div>
  );
};
