import { Button } from "@/components/ui/Button";
import { CirclePlus } from "lucide-react";
import { QuizDialog } from ".";
import { Dialog, DialogTrigger } from "../ui/Dialog";

export const QuizCreate = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-fit">
          <CirclePlus className="size-5" strokeWidth={3} />
          <span className="ml-2 hidden md:block">Create New Quiz</span>
        </Button>
      </DialogTrigger>

      <QuizDialog />
    </Dialog>
  );
};
