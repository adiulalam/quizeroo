import { Spinner } from "../ui/Spinner";
import { H2 } from "../ui/Typography";

export const JoinQuestionSubmitted = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2">
      <H2 className="text-center" data-testid="heading-answer-submitted">
        Your answer has been submitted!
      </H2>
      <Spinner size="large" />
    </div>
  );
};
