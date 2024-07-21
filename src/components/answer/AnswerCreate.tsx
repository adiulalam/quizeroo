import { Plus } from "lucide-react";
import { Button } from "../ui/Button";
import { api } from "@/utils/api";
import { useQuestion } from "@/hooks";
import { toast } from "../ui/useToast";

export const AnswerCreate = () => {
  const { id } = useQuestion();
  const { question } = api.useUtils();

  const { mutate } = api.answer.createAnswer.useMutation({
    onSuccess: () => {
      void question.getQuestions.invalidate();
    },
    onError: (e) => {
      const message = e.message;

      toast({
        title: `Action Failed! ${message}`,
        variant: "destructive",
      });
    },
  });

  const onClickHandler = () => {
    mutate({ id });
  };

  return (
    <Button
      type="button"
      variant="ghost"
      className="w-min border-2 border-dashed border-primary/80 shadow-sm"
      onClick={onClickHandler}
    >
      <Plus className="mr-2 size-4" />
      Add a new answer
    </Button>
  );
};
