import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Switch } from "@/components/ui/Switch";
import {
  createQuizSchema,
  type CreateQuizSchemaType,
} from "@/server/schema/quiz.schema";
import { QuizStepperActions } from ".";
import { api } from "@/utils/api";
import { useQuizDialog } from "@/hooks";
import { Textarea } from "../ui/Textarea";
import { useEffect } from "react";

export type StepQuizType = {
  quizData: CreateQuizSchemaType;
  setQuizData: React.Dispatch<React.SetStateAction<CreateQuizSchemaType>>;
};

export const StepQuiz = ({ quizData, setQuizData }: StepQuizType) => {
  const { quiz } = api.useUtils();
  const { nextStep } = useStepper();
  const { enableAi, setIsPending } = useQuizDialog();

  const form = useForm<CreateQuizSchemaType>({
    resolver: zodResolver(createQuizSchema),
    defaultValues: quizData,
    values: quizData,
  });

  const { isDirty } = form.formState;

  const { mutate, isPending } = api.quiz.createQuiz.useMutation({
    onSuccess: (data) => {
      setQuizData((prev) => ({
        ...prev,
        id: data.id,
        title: data.title,
        isFavourite: data.isFavourite,
      }));

      toast({
        title: `Quiz ${quizData.id ? "updated" : "created"}!`,
      });

      void quiz.getQuizzes.invalidate();

      nextStep();
    },
    onError: (e) => {
      const message = e?.message;
      toast({
        title: `Action Failed! ${message}`,
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    setIsPending(isPending);
  }, [isPending, setIsPending]);

  const onSubmit = (data: CreateQuizSchemaType) => {
    if (isDirty) {
      setQuizData((prev) => ({
        ...prev,
        description: data.description,
      }));

      mutate(data);
    } else {
      nextStep();
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quiz Title</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Title.."
                  data-testid="input-quiz-title"
                />
              </FormControl>
              <FormDescription>This is your quiz title.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {enableAi && (
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>AI Description ✨</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Tell us a little bit about your quiz.."
                  />
                </FormControl>
                <FormDescription>
                  Create a description for the quiz. Be as descriptive as you
                  can.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="isFavourite"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="flex flex-col gap-1">
                <FormLabel className="text-base">Set as Favourite?</FormLabel>
                <FormDescription>Mark this quiz as favourite.</FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  data-testid="switch-quiz-favourite"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <QuizStepperActions isLoading={isPending} />
      </form>
    </Form>
  );
};
