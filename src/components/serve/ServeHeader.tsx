import { useRouter } from "next/router";
import { ScrollArea } from "../ui/ScrollArea";
import { useCurrentQuestion } from "@/hooks";
import { H1, H2, H3 } from "../ui/Typography";

export const ServeHeader = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const {
    currentQuestionIndex,
    totalQuestionLength,
    isWaiting,
    currentQuestion,
  } = useCurrentQuestion();

  return (
    <div className="flex h-32 w-full items-center justify-center gap-2 p-2">
      {isWaiting ? (
        <div className="flex h-full gap-2">
          <div className="flex h-full flex-col items-center justify-center overflow-hidden text-ellipsis bg-muted/80 p-2">
            <H3 className="font-light">Join at</H3>
            <H2 className="font-bold">www.website.com</H2>
          </div>

          <div className="flex h-full flex-col items-center justify-center gap-1 bg-muted/80 p-2">
            <H3>Room Code:</H3>
            <H1 className="font-extrabold">{id}</H1>
          </div>
        </div>
      ) : (
        <ScrollArea className="flex max-h-full items-center justify-center overflow-y-auto p-2">
          <H2 className="font-bold">
            {currentQuestionIndex}/{totalQuestionLength}:{" "}
            {currentQuestion?.name}
          </H2>
        </ScrollArea>
      )}
    </div>
  );
};
