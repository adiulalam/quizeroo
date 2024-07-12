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

export type StepQuizType = {
  quizData: CreateQuizSchemaType;
  setQuizData: React.Dispatch<React.SetStateAction<CreateQuizSchemaType>>;
};

export const StepQuiz = ({ quizData, setQuizData }: StepQuizType) => {
  const { nextStep } = useStepper();

  const form = useForm<CreateQuizSchemaType>({
    resolver: zodResolver(createQuizSchema),
    defaultValues: quizData,
    values: quizData,
  });

  function onSubmit(_data: CreateQuizSchemaType) {
    console.log("🚀 ~ onSubmit ~ _data:", _data);

    setQuizData({
      id: _data.id,
      title: _data.title,
      isFavourite: _data.isFavourite,
    });

    nextStep();

    toast({
      title: "Quiz Created!",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quiz Title</FormLabel>
              <FormControl>
                <Input placeholder="Title.." {...field} />
              </FormControl>
              <FormDescription>This is your quiz title.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

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
                />
              </FormControl>
            </FormItem>
          )}
        />
        <QuizStepperActions />
      </form>
    </Form>
  );
};
