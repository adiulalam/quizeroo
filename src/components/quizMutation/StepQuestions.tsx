import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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

const createQuestionsSchema = z.object({
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

type CreateQuestionsSchemaType = z.infer<typeof createQuestionsSchema>;

export const StepQuestions = () => {
  const { nextStep } = useStepper();

  const form = useForm<CreateQuestionsSchemaType>({
    resolver: zodResolver(createQuestionsSchema),
    defaultValues: {
      password: "",
    },
  });

  function onSubmit(_data: CreateQuestionsSchemaType) {
    nextStep();
    toast({
      title: "Second step submitted!",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormDescription>This is your private password.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <QuizStepperActions />
      </form>
    </Form>
  );
};
