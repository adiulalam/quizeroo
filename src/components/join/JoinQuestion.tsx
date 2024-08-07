import { ServeHeaderQuestion } from "../serve";
import { JoinQuestionAnswer, JoinQuestionSubmitted } from ".";
import { useAnswerSubmitted } from "@/hooks/useAnswerSubmitted";
import { useCurrentQuestion } from "@/hooks";

export const JoinQuestion = () => {
  const { isAnswerSubmitted } = useAnswerSubmitted();

  const { showSubmission } = useCurrentQuestion();

  return (
    <div className="flex h-full w-full flex-col gap-2">
      <div className="flex max-h-32 w-full justify-center gap-2 bg-secondary p-2">
        <ServeHeaderQuestion showTotal={false} />
      </div>
      {showSubmission ? (
        <p>show submission</p>
      ) : isAnswerSubmitted ? (
        <JoinQuestionSubmitted />
      ) : (
        <JoinQuestionAnswer />
      )}
    </div>
  );
};
