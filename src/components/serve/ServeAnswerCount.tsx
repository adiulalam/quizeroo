import { useAnswerCounter } from "@/hooks";
import { H3 } from "../ui/Typography";

export const ServeAnswerCount = () => {
  const { answerCount } = useAnswerCounter();

  return (
    <div className="flex flex-col items-center justify-center">
      <H3 className="w-full truncate font-normal">Answers</H3>
      <H3 className="w-full truncate text-center font-bold">{answerCount}</H3>
    </div>
  );
};
