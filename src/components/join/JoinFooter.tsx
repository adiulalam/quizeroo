import { useCurrentQuestion, useQuizTempUser } from "@/hooks";
import { H3, H4 } from "../ui/Typography";

export const JoinFooter = () => {
  const { name } = useQuizTempUser();
  const { isWaiting } = useCurrentQuestion();

  return (
    <div className="flex h-14 w-full items-center justify-between gap-2 p-2">
      <H3 className="w-full truncate">{name}</H3>

      {!isWaiting && (
        <div className="flex w-20 items-center justify-center bg-muted/80">
          <H4>0</H4>
        </div>
      )}
    </div>
  );
};
