import { useStepper } from "@/components/ui/Stepper";
import { Button } from "@/components/ui/Button";
import { ArrowBigLeft, ArrowBigRight, CheckCheck, Loader2 } from "lucide-react";
import { DialogClose } from "../ui/Dialog";
import { Fragment } from "react";

export const QuizStepperActions = ({
  isLoading = false,
  isUpdate,
}: {
  isLoading?: boolean;
  isUpdate: boolean;
}) => {
  const {
    prevStep,
    resetSteps,
    isDisabledStep,
    hasCompletedAllSteps,
    isLastStep,
  } = useStepper();

  const Close = isUpdate && isLastStep ? DialogClose : Fragment;
  const props = isUpdate && isLastStep ? { asChild: true } : {};

  return (
    <div className="flex w-full justify-end gap-2">
      {hasCompletedAllSteps ? (
        <Button size="sm" type="button" onClick={resetSteps}>
          Reset
        </Button>
      ) : (
        <>
          <Button
            disabled={isDisabledStep}
            onClick={prevStep}
            size="sm"
            variant="secondary"
            type="button"
          >
            <ArrowBigLeft className="mr-2 size-4" />
            Prev
          </Button>
          <Close {...props}>
            <Button size="sm" type="submit" disabled={isLoading}>
              {isLastStep ? "Finish" : "Next"}
              {isLoading ? (
                <Loader2 className="ml-2 size-4 animate-spin" />
              ) : isLastStep ? (
                <CheckCheck className="ml-2 size-4" />
              ) : (
                <ArrowBigRight className="ml-2 size-4" />
              )}
            </Button>
          </Close>
        </>
      )}
    </div>
  );
};
