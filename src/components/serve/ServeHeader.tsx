import { useRouter } from "next/router";
import { ScrollArea } from "../ui/ScrollArea";
import { useCurrentQuestion } from "@/hooks";

export const ServeHeader = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const { isWaiting, currentQuestion } = useCurrentQuestion();

  return (
    <div className="flex h-32 w-full items-center justify-center gap-2 p-2">
      {isWaiting ? (
        <div className="flex h-full gap-2">
          <div className="flex h-full flex-col items-center justify-center overflow-hidden text-ellipsis bg-muted/80 p-2">
            <h2 className="scroll-m-20 text-start text-base font-light tracking-tight first:mt-0 sm:text-3xl">
              Join at
            </h2>
            <h2 className="scroll-m-20 text-start text-base font-bold tracking-tight first:mt-0 sm:text-3xl">
              www.website.com
            </h2>
          </div>

          <div className="flex h-full flex-col items-center justify-center gap-1 bg-muted/80 p-2">
            <h3 className="scroll-m-20 truncate text-base font-semibold  tracking-tight sm:text-2xl">
              Room Code:
            </h3>
            <h1 className="scroll-m-20 text-lg font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              {id}
            </h1>
          </div>
        </div>
      ) : (
        <ScrollArea className="flex max-h-full items-center justify-center overflow-y-auto p-2">
          <h2 className="scroll-m-20 text-center text-base font-bold tracking-tight first:mt-0 sm:text-3xl">
            {currentQuestion?.name}
          </h2>
        </ScrollArea>
      )}
    </div>
  );
};
