import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { useViewQuiz } from "@/hooks/useViewQuiz";
import { useMemo } from "react";
import {
  AnswerButton,
  type answerButtonVariants,
} from "@/components/ui/AnswerButton";
import type { VariantProps } from "class-variance-authority";

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

  const questionsLength = Array.isArray(questions) && (questions.length || 1);

  const questionTitle = question ? question.name : "No questions been found.";

  return (
    <Card className="h-full overflow-hidden rounded-b-none">
      <CardHeader className="py-4">
        <CardDescription>Question 1/{questionsLength}</CardDescription>
        <CardTitle>{questionTitle}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap justify-evenly gap-2">
        {[...Array(4).keys()].map((i) => (
          <AnswerButton
            key={i}
            iconSize="medium"
            variant={answerMap[String(i)]}
          />
        ))}
      </CardContent>
    </Card>
  );
};
