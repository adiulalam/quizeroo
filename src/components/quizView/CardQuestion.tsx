import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { useViewQuiz } from "@/hooks/useViewQuiz";
import { useMemo } from "react";

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
      <CardContent className="flex gap-2">
        <p>Card Content</p>
        <p>Card Content</p>
        <p>Card Content</p>
        <p>Card Content</p>
      </CardContent>
    </Card>
  );
};
