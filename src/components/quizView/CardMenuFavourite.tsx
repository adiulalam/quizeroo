import { DropdownMenuItem } from "../ui/DropdownMenu";
import { Heart, HeartCrack } from "lucide-react";
import { useViewQuiz } from "@/hooks/useViewQuiz";
import { api } from "@/utils/api";

export const CardMenuFavourite = () => {
  const { id, isFavourite } = useViewQuiz();
  const { quiz } = api.useContext();

  const { mutate } = api.quiz.updateFormFavourite.useMutation({
    onSuccess: () => quiz.getQuizzes.invalidate(),
  });

  const onClickHandler = () => {
    mutate({ body: { isFavourite: !isFavourite }, params: { id } });
  };

  return (
    <DropdownMenuItem onClick={onClickHandler}>
      {isFavourite ? (
        <HeartCrack className="mr-2 size-4" />
      ) : (
        <Heart className="mr-2 size-4" />
      )}
      {isFavourite ? "Unmark" : "Mark"} as Favourite
    </DropdownMenuItem>
  );
};
