import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { useStepper } from "@/components/ui/Stepper";
import { Form } from "@/components/ui/Form";
import { toast } from "@/components/ui/useToast";
import { QuizStepperActions } from ".";
import { QuestionCreate, QuestionsDragable } from "../question";
import { api, type RouterOutputs } from "@/utils/api";
import { createQuestionSchema } from "@/server/schema/question.schema";
import type { CreateQuizSchemaType } from "@/server/schema/quiz.schema";
import { MutateQuizProvider, QuestionFormProvider } from "@/provider";
import { useQuizDialog } from "@/hooks";
import { QuestionDialogSkeleton } from "../skeleton";
import { useEffect } from "react";

const mutationQuestionsSchema = z.object({
  questions: createQuestionSchema,
});

export type mutationQuestionsSchemaType = {
  questions: RouterOutputs["question"]["getQuestions"];
};

export const StepQuestions = ({
  quizData,
}: {
  quizData: CreateQuizSchemaType;
}) => {
  const { id, title, isFavourite } = quizData;
  if (!id) throw new Error("id not found on StepQuestions");

  const { isUpdate, setIsDialogOpen, setIsPending } = useQuizDialog();

  const { nextStep } = useStepper();

  const { data, isLoading } = api.question.getQuestions.useQuery({
    id,
  });

  const {
    quiz: { getQuizzes },
  } = api.useUtils();

  const { mutate, isPending } = api.question.updateQuestions.useMutation({
    onSuccess: () => {
      nextStep();
      toast({
        title: `Questions ${isUpdate ? "updated" : "created"}!`,
      });

      isUpdate && setIsDialogOpen(false);
    },
  });

  useEffect(() => {
    setIsPending(isPending);
  }, [isPending, setIsPending]);

  const form = useForm<mutationQuestionsSchemaType>({
    resolver: zodResolver(mutationQuestionsSchema),
    defaultValues: {
      questions: data ?? [],
    },
    values: {
      questions: data ?? [],
    },
  });

  const { isDirty } = form.formState;

  function onSubmit(data: mutationQuestionsSchemaType) {
    if (isDirty) {
      mutate(data.questions);
    } else {
      isUpdate ? setIsDialogOpen(false) : nextStep();
    }

    void getQuizzes.invalidate();
  }

  if (isLoading) {
    return <QuestionDialogSkeleton />;
  }

  return (
    <MutateQuizProvider
      value={{ id, title, isFavourite, questions: data ?? [] }}
    >
      <QuestionFormProvider value={form}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <QuestionCreate />
            <QuestionsDragable />
            <QuizStepperActions />
          </form>
        </Form>
      </QuestionFormProvider>
    </MutateQuizProvider>
  );
};
