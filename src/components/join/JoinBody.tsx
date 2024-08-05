import { useCurrentQuestion } from "@/hooks";
import { type JoinWaitingtype } from "./JoinWaiting";
import { JoinQuestion, JoinWaiting } from ".";

export const JoinBody = ({ setShowForm }: JoinWaitingtype) => {
  const { currentQuestionId } = useCurrentQuestion();

  return (
    <div className="flex h-full w-full bg-muted/40 p-2">
      {currentQuestionId ? (
        <JoinQuestion />
      ) : (
        <JoinWaiting setShowForm={setShowForm} />
      )}
    </div>
  );
};
