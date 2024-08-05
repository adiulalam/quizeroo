import { ScrollArea } from "../ui/ScrollArea";
import { useCurrentQuestion } from "@/hooks";
import { H2 } from "../ui/Typography";

export const ServeHeaderQuestion = () => {
  const { currentQuestionIndex, totalQuestionLength, currentQuestion } =
    useCurrentQuestion();

  return (
    <ScrollArea className="flex max-h-full items-center justify-center overflow-y-auto p-2">
      <H2 className="font-bold">
        {currentQuestionIndex}/{totalQuestionLength}: {currentQuestion?.name}
      </H2>
    </ScrollArea>
  );
};
