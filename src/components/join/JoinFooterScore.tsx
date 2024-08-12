import { useUserScore } from "@/hooks";
import { H4 } from "../ui/Typography";

export const JoinFooterScore = () => {
  const { score } = useUserScore();

  return (
    <div className="flex w-20 items-center justify-center bg-muted/80">
      <H4>{score.currentScore}</H4>
    </div>
  );
};
