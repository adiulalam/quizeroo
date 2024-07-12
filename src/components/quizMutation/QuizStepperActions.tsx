import { useStepper } from "@/components/ui/Stepper";
import { Button } from "@/components/ui/Button";

export const QuizStepperActions = () => {
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
          >
            Prev
          </Button>
          <Button size="sm" type="submit">
            {isLastStep ? "Finish" : "Next"}
          </Button>
        </>
      )}
    </div>
  );
};
