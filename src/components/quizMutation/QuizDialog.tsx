import {
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/Dialog";
import { QuizStepper } from ".";
import { ScrollArea } from "../ui/ScrollArea";
import { useQuizDialog } from "@/hooks";

export const QuizDialog = () => {
  const { isUpdate } = useQuizDialog();

  return (
    <DialogContent className="p-0 sm:max-w-2xl" data-testid="quiz-dialog">
      <ScrollArea className="max-h-[95vh] p-5">
        <DialogTitle className="hidden" aria-hidden="true">
          {isUpdate ? "Update" : "Create"} quiz
        </DialogTitle>
        <DialogDescription className="hidden" aria-hidden="true">
          Multi step form to {isUpdate ? "update" : "create"} quiz
        </DialogDescription>
        <QuizStepper />
      </ScrollArea>
    </DialogContent>
  );
};
