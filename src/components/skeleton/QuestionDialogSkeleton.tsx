import { Skeleton } from "../ui/Skeleton";

export const QuestionDialogSkeleton = () => {
  return (
    <div className="flex flex-col gap-6">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-14 w-full" />
      <div className="flex flex-row justify-end gap-2">
        <Skeleton className="h-10 w-20" />
        <Skeleton className="h-10 w-20" />
      </div>
    </div>
  );
};
