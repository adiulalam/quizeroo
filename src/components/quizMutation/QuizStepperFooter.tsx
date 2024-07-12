import { useStepper } from "@/components/ui/Stepper";
import { Button } from "@/components/ui/Button";
import { type CreateQuizSchemaType } from "@/server/schema/quiz.schema";
import { RotateCcw } from "lucide-react";

export const QuizStepperFooter = ({
  setQuizData,
}: {
  setQuizData: React.Dispatch<React.SetStateAction<CreateQuizSchemaType>>;
}) => {
  const { activeStep, resetSteps, steps, hasCompletedAllSteps } = useStepper();

  const onClickHandler = () => {
    setQuizData({ id: null, title: "", isFavourite: false });
    resetSteps();
  };

  if (activeStep !== steps.length) {
    return null;
  }

  return (
    <>
      {hasCompletedAllSteps && (
        <div className="my-2 flex h-40 items-center justify-center rounded-md border bg-secondary text-primary">
          <h1 className="text-xl">Woohoo! Quiz has been created! 🎉</h1>
        </div>
      )}
      <div className="flex w-full justify-end gap-2">
        <Button onClick={onClickHandler} size="sm">
          Create Another Quiz
          <RotateCcw className="ml-2 size-4" />
        </Button>
      </div>
    </>
  );
};
