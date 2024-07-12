import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/Dialog";
import { QuizStepper } from ".";

export const QuizDialog = ({ children }: { children: React.ReactNode }) => {
  return (
    <Dialog onOpenChange={(open) => console.log(open)}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogTitle className="hidden" aria-hidden="true">
          Create a quiz
        </DialogTitle>
        <DialogDescription className="hidden" aria-hidden="true">
          Multi step form to create quiz
        </DialogDescription>

        <QuizStepper />
      </DialogContent>
    </Dialog>
  );
};
