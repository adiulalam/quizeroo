import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import z from "zod";
import { useStepper } from "@/components/ui/Stepper";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { toast } from "@/components/ui/useToast";
import { QuizStepperActions } from ".";
import { QuestionCreate } from "../questionMutation";
import { api } from "@/utils/api";
import { createQuestionSchema } from "@/server/schema/question.schema";
import type { CreateQuizSchemaType } from "@/server/schema/quiz.schema";
import { MutateQuizProvider } from "@/provider";

const createQuestionsSchema = z.object({
  questions: createQuestionSchema.array(),
});

type CreateQuestionsSchemaType = z.infer<typeof createQuestionsSchema>;

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

  const form = useForm<CreateQuestionsSchemaType>({
    resolver: zodResolver(createQuestionsSchema),
    defaultValues: {
      questions: data ?? [],
    },
    values: {
      questions: data ?? [],
    },
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: "questions",
  });

  function onSubmit(_data: CreateQuestionsSchemaType) {
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
    <MutateQuizProvider value={quiz}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <QuestionCreate />
          {fields.map((field, index) => (
            <FormField
              key={field.id}
              control={form.control}
              name={`questions.${index}.name`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your question title.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <QuizStepperActions isUpdate={isUpdate} />
        </form>
      </Form>
    </MutateQuizProvider>
  );
};
