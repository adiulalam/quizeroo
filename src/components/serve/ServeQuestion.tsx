import { ServeQuestionAnswer, ServeQuestionChart, ServeQuestionInfo } from ".";
import { useCurrentQuestion } from "@/hooks";

export const ServeQuestion = () => {
  const { showSubmission } = useCurrentQuestion();

  return (
    <div className="flex h-full w-full flex-col gap-2">
      <ServeQuestionInfo />
      {showSubmission ? <ServeQuestionChart /> : <ServeQuestionAnswer />}
    </div>
  );
};
