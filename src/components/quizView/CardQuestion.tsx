import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { useViewQuiz } from "@/hooks";
import { useMemo } from "react";
import { AnswerButton } from "@/components/ui/AnswerButton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/Tooltip";
import { answerMap } from "@/utils/constants";

export const CardQuestion = () => {
  const { questions } = useViewQuiz();

  const question = useMemo(() => {
    if (Array.isArray(questions) && questions.length > 0) {
      return questions[0];
    }

    return null;
  }, [questions]);

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
              <TooltipTrigger asChild>
                <span>
                  <AnswerButton
                    iconSize="medium"
                    variant={answerMap[String(index)]}
                  />
                </span>
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
