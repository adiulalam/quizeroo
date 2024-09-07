import { Skeleton } from "../ui/Skeleton";

export const ProfileSkeleton = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-16 rounded-none" />
        <Skeleton className="h-4 w-48 rounded-none" />
        <Skeleton className="h-10 w-full rounded-lg" />
      </div>

      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-16 rounded-none" />
        <Skeleton className="h-4 w-48 rounded-none" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-16 rounded-none" />
        <Skeleton className="h-4 w-48 rounded-none" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-16 rounded-none" />
        <Skeleton className="h-4 w-48 rounded-none" />
        <div className="flex gap-8">
          <Skeleton className="h-4 w-16 rounded-none" />
          <Skeleton className="h-4 w-16 rounded-none" />
          <Skeleton className="h-4 w-16 rounded-none" />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-16 rounded-none" />
        <Skeleton className="h-4 w-48 rounded-none" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      <Skeleton className="h-10 w-36 self-end rounded-md" />
    </div>
  );
};
