import { Step, Stepper } from "@/components/ui/Stepper";
import { useState } from "react";
import { type CreateQuizSchemaType } from "@/server/schema/quiz.schema";
import { StepQuiz, StepQuestions, QuizStepperFooter } from ".";

export type QuizStepperType = {
  id?: null | string;
  title?: string;
  isFavourite?: boolean;
  isUpdate?: boolean;
};

export const QuizStepper = ({
  id = null,
  title = "",
  isFavourite = false,
  isUpdate = false,
}: QuizStepperType) => {
  console.log("🚀 ~ isUpdate:", isUpdate);
  const steps = [
    {
      label: "Step 1",
      description: "Create Your Quiz",
      StepBlock: StepQuiz,
    },
    { label: "Step 2", description: "Populate Quiz", StepBlock: StepQuestions },
  ];

  const [quizData, setQuizData] = useState<CreateQuizSchemaType>({
    id,
    title,
    isFavourite,
  });

  return (
    <div className="flex w-full flex-col gap-4 p-1">
      <Stepper variant="circle-alt" initialStep={0} steps={steps}>
        {steps.map((stepProps) => (
          <Step key={stepProps.label} {...stepProps}>
            <stepProps.StepBlock
              quizData={quizData}
              setQuizData={setQuizData}
              isUpdate={isUpdate}
            />
          </Step>
        ))}
        {!isUpdate && <QuizStepperFooter setQuizData={setQuizData} />}
      </Stepper>
    </div>
  );
};
