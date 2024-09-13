import { Skeleton } from "../ui/Skeleton";

type TableSkeletonType = {
  rows?: number;
  showPagination?: boolean;
};

export const TableSkeleton = ({
  rows = 5,
  showPagination = true,
}: TableSkeletonType) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex w-full flex-col gap-1 rounded-lg">
        <Skeleton className="h-20 lg:h-12" />

        {[...Array(rows).keys()].map((i) => (
          <Skeleton className="h-12" key={i} />
        ))}
      </div>

      {showPagination && <Skeleton className="h-8 w-1/2 max-w-80 self-end" />}
    </div>
  );
};
