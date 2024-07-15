import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/AlertDialog";
import { DropdownMenuItem } from "../ui/DropdownMenu";
import { Trash2 } from "lucide-react";
import { useViewQuiz } from "@/hooks/useViewQuiz";
import { api } from "@/utils/api";
import { toast } from "../ui/useToast";

export const CardMenuDeleteAlert = () => {
  const { id } = useViewQuiz();
  const { quiz } = api.useUtils();

  const { mutate } = api.quiz.deleteQuiz.useMutation({
    onSuccess: () => {
      void quiz.getQuizzes.invalidate();

      toast({
        title: "Quiz Deleted Successfully",
      });
    },
    onError: () => {
      toast({
        title: "Action Failed!",
        variant: "destructive",
      });
    },
  });

  const onClickHandler = () => {
    mutate({ id });
  };

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your quiz
          from our servers.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
          onClick={onClickHandler}
          className="hover:bg-destructive"
        >
          Continue
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export const CardMenuDelete = () => {
  return (
    <AlertDialogTrigger asChild>
      <DropdownMenuItem>
        <Trash2 className="mr-2 size-4" />
        Delete
      </DropdownMenuItem>
    </AlertDialogTrigger>
  );
};
