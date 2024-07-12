import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CirclePlus } from "lucide-react";
import { QuizDialog } from ".";

export const QuizCreate = () => {
  return (
    <QuizDialog>
      <Card className="border-1 flex h-52 w-full border-dotted md:w-80">
        <Button className="flex h-full w-full flex-col border-2 border-dashed border-primary bg-primary/60">
          <CirclePlus className="size-14 fill-foreground/90 text-background" />
          <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Create New Quiz
          </h2>
        </Button>
      </Card>
    </QuizDialog>
  );
};
