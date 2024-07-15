import { DropdownMenuItem } from "../ui/DropdownMenu";
import { Heart, HeartCrack } from "lucide-react";
import { useViewQuiz } from "@/hooks/useViewQuiz";
import { api } from "@/utils/api";

export const CardMenuFavourite = () => {
  const { id, isFavourite } = useViewQuiz();
  const { quiz } = api.useUtils();

  const { mutate } = api.quiz.updateQuizFavourite.useMutation({
    onSuccess: () => quiz.getQuizzes.invalidate(),
  });

  const onClickHandler = () => {
    mutate({ body: { isFavourite: !isFavourite }, params: { id } });
  };

  const Icon = isFavourite ? HeartCrack : Heart;

  return (
    <DropdownMenuItem onClick={onClickHandler}>
      <Icon className="mr-2 size-4" />
      {isFavourite ? "Unmark" : "Mark"} as Favourite
    </DropdownMenuItem>
  );
};
