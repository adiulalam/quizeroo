import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { useViewQuiz } from "@/hooks";
import { useMemo } from "react";
import {
  AnswerButton,
  type answerButtonVariants,
} from "@/components/ui/AnswerButton";
import type { VariantProps } from "class-variance-authority";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/Tooltip";

const answerMap = {
  "0": "triangle",
  "1": "diamond",
  "2": "circle",
  "3": "square",
} as Record<string, VariantProps<typeof answerButtonVariants>["variant"]>;

export const CardQuestion = () => {
  const { questions } = useViewQuiz();

  const question = useMemo(() => {
    if (Array.isArray(questions) && questions.length > 0) {
      return questions[0];
    }

    return null;
  }, [questions]);
  console.log("🚀 ~ question ~ question:", question);

  const questionsLength = Array.isArray(questions) && (questions.length || 1);

  const questionTitle = question ? question.name : "No questions been found.";

  const answers = question?.answers.length
    ? question.answers.slice(0, 4)
    : [...Array(4).keys()];

  return (
    <Card className="h-full overflow-hidden rounded-b-none">
      <CardHeader className="py-4">
        <CardDescription>Question 1/{questionsLength}</CardDescription>
        <CardTitle>{questionTitle}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap justify-evenly gap-2">
        {answers.map((answer, index) => (
          <TooltipProvider key={index}>
            <Tooltip>
              <TooltipTrigger>
                <AnswerButton
                  iconSize="medium"
                  variant={answerMap[String(index)]}
                />
              </TooltipTrigger>
              {typeof answer !== "number" && (
                <TooltipContent>
                  <p>
                    {answer.name} {answer.isCorrect ? "(correct answer)" : ""}
                  </p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        ))}
      </CardContent>
    </Card>
  );
};
