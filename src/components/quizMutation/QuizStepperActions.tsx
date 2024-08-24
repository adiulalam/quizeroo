import { useStepper } from "@/components/ui/Stepper";
import { Button } from "@/components/ui/Button";
import { ArrowBigLeft, ArrowBigRight, CheckCheck, Loader2 } from "lucide-react";

export const QuizStepperActions = ({
  isLoading = false,
}: {
  isLoading?: boolean;
}) => {
  const {
    prevStep,
    resetSteps,
    isDisabledStep,
    hasCompletedAllSteps,
    isLastStep,
  } = useStepper();

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
            data-testid="button-quiz-prev-step"
          >
            <ArrowBigLeft className="mr-2 size-4" />
            Prev
          </Button>
          <Button
            size="sm"
            type="submit"
            disabled={isLoading}
            data-testid="button-quiz-next-step"
          >
            {isLastStep ? "Finish" : "Next"}
            {isLoading ? (
              <Loader2 className="ml-2 size-4 animate-spin" />
            ) : isLastStep ? (
              <CheckCheck className="ml-2 size-4" />
            ) : (
              <ArrowBigRight className="ml-2 size-4" />
            )}
          </Button>
        </>
      )}
    </div>
  );
};
