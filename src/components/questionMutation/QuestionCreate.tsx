import { Plus } from "lucide-react";
import { Button } from "../ui/Button";
import { api } from "@/utils/api";
import { useMutateQuiz } from "@/hooks/useMutateQuiz";
import { useQuestionForm } from "@/hooks/useQuestionForm";

export const QuestionCreate = () => {
  const { id } = useMutateQuiz();
  const { question } = api.useUtils();
  const { getValues } = useQuestionForm();

  const { mutate } = api.question.createQuestion.useMutation({
    onSuccess: () => {
      void question.getQuestions.invalidate();
    },
  });

  const onClickHandler = () => {
    const data = getValues();
    console.log("🚀 ~ onClickHandler ~ data:", data);
    const questions = data.questions.map(({ id }, index) => ({
      id,
      order: index,
    }));

    mutate({ params: { id }, body: questions });
  };

  return (
    <Button
      type="button"
      variant="outline"
      className="border-2 border-dashed border-primary/80 shadow-sm"
      onClick={onClickHandler}
    >
      <Plus className="mr-2 size-4" />
      Add a new question
    </Button>
  );
};
