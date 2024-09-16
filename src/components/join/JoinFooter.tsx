import { useCurrentQuestion, useQuizTempUser } from "@/hooks";
import { H3 } from "../ui/Typography";
import { JoinFooterScore } from ".";

export const JoinFooter = () => {
  const { name } = useQuizTempUser();
  const { isWaiting } = useCurrentQuestion();

  return (
    <div className="flex h-14 w-full items-center justify-between gap-2 p-2">
      <H3 className="w-full truncate" data-testid="heading-join-username">
        {name}
      </H3>

      {!isWaiting && <JoinFooterScore />}
    </div>
  );
};
