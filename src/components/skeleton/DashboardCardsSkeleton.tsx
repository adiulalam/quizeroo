import { Skeleton } from "../ui/Skeleton";

export const DashboardCardSkeleton = () => {
  return (
    <Skeleton className="flex h-32 w-[calc(100dvw-2rem)] min-w-full flex-1 flex-col rounded-lg sm:w-72 sm:min-w-72" />
  );
};

export const DashboardCardsSkeleton = () => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex w-[calc(100dvw-2rem)] flex-nowrap gap-1 overflow-x-hidden sm:w-full sm:flex-wrap sm:overflow-x-auto">
        <DashboardCardSkeleton />
        <DashboardCardSkeleton />
        <DashboardCardSkeleton />
        <DashboardCardSkeleton />
      </div>

      <Skeleton className="flex h-14 w-full rounded-lg sm:hidden" />
    </div>
  );
};
