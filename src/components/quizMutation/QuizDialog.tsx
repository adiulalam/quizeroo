import {
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/Dialog";
import { QuizStepper } from ".";
import type { QuizStepperType } from "./QuizStepper";

type QuizDialogType = QuizStepperType;

export const QuizDialog = (props: QuizDialogType) => {
  const { id } = props;

  return (
    <DialogContent className="sm:max-w-xl">
      <DialogTitle className="hidden" aria-hidden="true">
        {id ? "Update" : "Create"} quiz
      </DialogTitle>
      <DialogDescription className="hidden" aria-hidden="true">
        Multi step form to {id ? "update" : "create"} quiz
      </DialogDescription>

      <QuizStepper {...props} />
    </DialogContent>
  );
};
