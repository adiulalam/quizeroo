import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { useStepper } from "@/components/ui/Stepper";
import { Form } from "@/components/ui/Form";
import { toast } from "@/components/ui/useToast";
import { QuizStepperActions } from ".";
import { QuestionCreate, QuestionsDragable } from "../questionMutation";
import { api } from "@/utils/api";
import { createQuestionSchema } from "@/server/schema/question.schema";
import type { CreateQuizSchemaType } from "@/server/schema/quiz.schema";
import { MutateQuizProvider, QuestionFormProvider } from "@/provider";

// todo: fix this mess here
const mutationQuestionsSchema = z.object({
  questions: createQuestionSchema.array(),
});

export type mutationQuestionsSchemaType = z.infer<
  typeof mutationQuestionsSchema
>;

const validateQuizData = (inputs: unknown) => {
  const quizData = z.object({
    id: z.string().uuid(),
    title: z.string(),
    isFavourite: z.boolean(),
  });

  const isValidData = quizData.parse(inputs);
  return isValidData;
};

export const StepQuestions = ({
  quizData,
  isUpdate,
}: {
  quizData: CreateQuizSchemaType;
  isUpdate: boolean;
}) => {
  const quiz = validateQuizData(quizData);

  const { data, isLoading } = api.question.getQuestions.useQuery({
    id: quiz.id,
  });

  const { nextStep } = useStepper();

  const form = useForm<mutationQuestionsSchemaType>({
    resolver: zodResolver(mutationQuestionsSchema),
    defaultValues: {
      questions: data ?? [],
    },
    values: {
      questions: data ?? [],
    },
  });

  function onSubmit(_data: mutationQuestionsSchemaType) {
    console.log("🚀 ~ onSubmit ~ _data:", _data);
    nextStep();
    toast({
      title: "Questions submitted!",
    });
  }

  if (isLoading) {
    return <p>loading</p>;
  }

  return (
    <MutateQuizProvider value={{ ...quiz, questions: data ?? [] }}>
      <QuestionFormProvider value={form}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <QuestionCreate />
            <QuestionsDragable />
            <QuizStepperActions isUpdate={isUpdate} />
          </form>
        </Form>
      </QuestionFormProvider>
    </MutateQuizProvider>
  );
};
