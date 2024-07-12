import { Button } from "@/components/ui/Button";
import { CirclePlus } from "lucide-react";
import { QuizDialog } from ".";

export const QuizCreate = () => {
  return (
    <QuizDialog>
      <Button className="w-fit">
        <CirclePlus className="size-5" strokeWidth={3} />
        <span className="ml-2 hidden md:block ">Create New Quiz</span>
      </Button>
    </QuizDialog>
  );
};
