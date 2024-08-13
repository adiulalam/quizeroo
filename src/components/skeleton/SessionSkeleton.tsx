import { Skeleton } from "../ui/Skeleton";

export const SessionSkeleton = () => {
  return (
    <div className="flex h-dvh flex-col items-center justify-between">
      <div className="flex h-14 w-full p-2 ">
        <Skeleton className="h-full w-full rounded-none" />
      </div>

      <div className="flex h-full w-full p-2">
        <Skeleton className="h-full w-full" />
      </div>

      <div className="flex h-14 w-full p-2 ">
        <Skeleton className="h-full w-full rounded-none" />
      </div>
    </div>
  );
};
