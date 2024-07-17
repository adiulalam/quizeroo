import {
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/Dialog";
import { QuizStepper } from ".";
import type { QuizStepperType } from "./QuizStepper";
import { ScrollArea } from "../ui/ScrollArea";

type QuizDialogType = QuizStepperType;

export const QuizDialog = (props: QuizDialogType) => {
  const { id } = props;

  return (
    <DialogContent className="p-0 sm:max-w-2xl">
      <ScrollArea className="max-h-[95vh] p-5">
        <DialogTitle className="hidden" aria-hidden="true">
          {id ? "Update" : "Create"} quiz
        </DialogTitle>
        <DialogDescription className="hidden" aria-hidden="true">
          Multi step form to {id ? "update" : "create"} quiz
        </DialogDescription>
        <QuizStepper {...props} isUpdate={!!id} />
      </ScrollArea>
    </DialogContent>
  );
};
