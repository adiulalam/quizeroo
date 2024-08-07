import { ScrollArea } from "../ui/ScrollArea";
import { useCurrentQuestion } from "@/hooks";
import { H2 } from "../ui/Typography";

export const ServeHeaderQuestion = ({
  showTotal = true,
}: {
  showTotal?: boolean;
}) => {
  const { currentQuestionIndex, totalQuestionLength, currentQuestion } =
    useCurrentQuestion();

  const totalQuestion = showTotal
    ? `${currentQuestionIndex}/${totalQuestionLength}: `
    : "";

  return (
    <ScrollArea className="flex max-h-full items-center justify-center overflow-y-auto p-2">
      <H2 className="font-bold">
        {totalQuestion}
        {currentQuestion?.name}
      </H2>
    </ScrollArea>
  );
};
