import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/Pagination";
import { cn } from "@/utils/theme";

export const CardsPagination = ({
  isActive = true,
}: {
  isActive?: boolean;
}) => {
  return (
    <Pagination className="flex rounded-lg border bg-card p-2 text-card-foreground shadow-sm sm:hidden">
      <PaginationContent className="flex w-full items-center justify-between gap-2">
        <PaginationItem>
          <PaginationPrevious onClick={undefined} />
        </PaginationItem>

        <div className="flex gap-3">
          <div
            className={cn(
              "size-2 rounded-full ",
              isActive ? "border bg-secondary shadow-sm" : "bg-primary",
            )}
          />
          <div className="size-2 rounded-full bg-primary" />
          <div className="size-2 rounded-full bg-primary" />
          <div className="size-2 rounded-full bg-primary" />
        </div>

        <PaginationItem>
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
