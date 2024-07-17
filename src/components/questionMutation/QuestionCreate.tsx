import { Plus } from "lucide-react";
import { Button } from "../ui/Button";
import { api } from "@/utils/api";
import { useMutateQuiz } from "@/hooks/useMutateQuiz";

export const QuestionCreate = () => {
  const { id } = useMutateQuiz();
  const { question } = api.useUtils();

  const { mutate } = api.question.createQuestion.useMutation({
    onSuccess: () => {
      void question.getQuestions.invalidate();
    },
  });

  const onClickHandler = () => {
    mutate({ id });
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
