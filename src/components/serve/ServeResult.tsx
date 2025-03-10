import { useQuizSession } from "@/hooks";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { TablePagination } from "../ui/TablePagination";
import { ScrollArea } from "../ui/ScrollArea";
import { Skeleton } from "../ui/Skeleton";
import { ErrorBox } from "../ui/ErrorBox";
import { api } from "@/utils/api";
import { resultColumns } from "@/utils/columns/resultColumns";

export const ServeResult = () => {
  const { id } = useQuizSession();
  const { data, isLoading, isError, refetch } =
    api.userQuizSession.getSessionScore.useQuery({ id });

  const table = useReactTable({
    data: data ?? [],
    columns: resultColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (isLoading) {
    return <Skeleton className="h-full w-full" />;
  }

  if (!data || isError) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <ErrorBox refetch={refetch} />
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col gap-2">
      <ScrollArea className="relative max-h-[80dvh] w-full overflow-auto rounded-md border shadow-md">
        <Table className="text-center" data-testid="table-serve-result">
          <TableHeader className="sticky top-0 bg-secondary">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-center">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={resultColumns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollArea>
      <TablePagination table={table} />
    </div>
  );
};
