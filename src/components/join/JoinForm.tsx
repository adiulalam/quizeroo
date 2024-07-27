import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/Form";
import { api } from "@/utils/api";
import { toast } from "../ui/useToast";
import {
  type MutateTempUserSchemaType,
  mutateTempUserSchema,
} from "@/server/schema/user.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import { cn } from "@/utils/theme";

type JoinFormtype = {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
};

export const JoinForm = ({ setShowForm }: JoinFormtype) => {
  const router = useRouter();
  const id = router.query.id as string;
  const { data: session, update } = useSession();

  const { mutateAsync, isPending } = api.user.updateTempUser.useMutation({
    onSuccess: async (e) => {
      await update({ name: e.name ?? "" });
    },
    onError: (e) => {
      const message = e?.message;
      toast({
        title: `Action Failed! ${message}`,
        variant: "destructive",
      });
    },
  });

  const form = useForm<MutateTempUserSchemaType>({
    resolver: zodResolver(mutateTempUserSchema),
    defaultValues: {
      name: session?.user?.name ?? "",
      quizSessionId: id,
    },
    values: {
      name: session?.user?.name ?? "",
      quizSessionId: id,
    },
  });

  const onSubmit = async (values: MutateTempUserSchemaType) => {
    if (session) {
      await mutateAsync({
        name: values.name,
        quizSessionId: values.quizSessionId,
      });
    } else {
      await signIn("credentials", {
        name: values.name,
        quizSessionId: id,
        redirect: false,
      });
    }
    setShowForm(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-dvh items-center justify-center bg-muted/40 p-2"
      >
        <Card className="w-full sm:w-96">
          <CardHeader>
            <CardTitle>Name</CardTitle>
            <CardDescription>
              {session ? "Update" : "Add"} your name for the quiz.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Name.."
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter
            className={cn("flex", session ? "justify-between" : "justify-end")}
          >
            {session && (
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            )}
            <Button type="submit" disabled={!form.formState.isDirty}>
              Submit
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};
