import { Card } from "@/components/ui/Card";
import { CardText, CardMenu, CardSessionButton, CardQuestion } from ".";
import { Badge } from "../ui/Badge";
import { useViewQuiz } from "@/hooks";
import { Heart } from "lucide-react";

export const QuizCard = () => {
  const { status, isFavourite } = useViewQuiz();
  return (
    <Card className="grid h-72 w-full grid-cols-5 grid-rows-5 gap-2 hover:shadow-lg sm:max-w-sm">
      <div className="relative col-span-5 row-span-3 rounded-t-sm bg-muted px-6 pt-4">
        <Badge className="absolute right-0 top-0 m-2">{status}</Badge>

        {isFavourite && (
          <Badge
            className="absolute left-0 top-0 m-2 border-0"
            variant="outline"
          >
            <Heart className="size-4 fill-primary" />
          </Badge>
        )}

        <CardQuestion />
      </div>

      <div className="col-span-5 row-span-2 row-start-4 flex flex-col justify-evenly gap-2 p-2 ">
        <div className="max-h-18 flex justify-between gap-2">
          <CardText />

          <CardMenu />
        </div>

        <CardSessionButton />
      </div>
    </Card>
  );
};
