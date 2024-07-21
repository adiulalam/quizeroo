import { Card } from "@/components/ui/Card";
import { Skeleton } from "../ui/Skeleton";

export const QuizSkeleton = () => {
  return (
    <Card className="grid h-72 w-full grid-cols-5 grid-rows-5 gap-2 hover:shadow-lg sm:max-w-sm">
      <div className="relative col-span-5 row-span-3 rounded-t-sm px-6 pt-4">
        <Skeleton className="h-full w-full rounded-xl" />
      </div>

      <div className="col-span-5 row-span-2 row-start-4 flex flex-col justify-evenly gap-2 p-2 ">
        <Skeleton className="h-1/2 w-full" />

        <Skeleton className="h-1/2 w-full" />
      </div>
    </Card>
  );
};
