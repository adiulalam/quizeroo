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
import { ScrollArea, ScrollBar } from "../ui/ScrollArea";
import type { DashboardColumnType } from "@/types/Dashboard.types";
import { dashboardcolumns } from "@/utils/columns/dashboardColumns";

const data: DashboardColumnType[] = [
  {
    id: "m5gr84i9",
    title: "ken99@yahoo.com",
    status: "DRAFT",
    total_question: 316,
    avg_answer: 123,
    avg_correct_answer: 316,
    avg_score: 123,
    total_sessions: 316,
    total_users: 123,
    created_at: new Date("2024-12-01"),
  },
  {
    id: "m5gr84i9",
    title: "ken99@yahoo.com",
    status: "DRAFT",
    total_question: 316,
    avg_answer: 123,
    avg_correct_answer: 316,
    avg_score: 123,
    total_sessions: 316,
    total_users: 123,
    created_at: new Date("2024-11-01"),
  },
  {
    id: "m5gr84i9",
    title: "ken99@yahoo.com",
    status: "DRAFT",
    total_question: 316,
    avg_answer: 123,
    avg_correct_answer: 316,
    avg_score: 123,
    total_sessions: 316,
    total_users: 123,
    created_at: new Date("2024-10-01"),
  },
  {
    id: "m5gr84i9",
    title: "ken99@yahoo.com",
    status: "DRAFT",
    total_question: 316,
    avg_answer: 123,
    avg_correct_answer: 316,
    avg_score: 123,
    total_sessions: 316,
    total_users: 123,
    created_at: new Date(),
  },
  {
    id: "m5gr84i9",
    title: "ken99@yahoo.com",
    status: "DRAFT",
    total_question: 316,
    avg_answer: 123,
    avg_correct_answer: 316,
    avg_score: 123,
    total_sessions: 316,
    total_users: 123,
    created_at: new Date(),
  },
  {
    id: "m5gr84i9",
    title: "ken99@yahoo.com",
    status: "DRAFT",
    total_question: 316,
    avg_answer: 123,
    avg_correct_answer: 316,
    avg_score: 123,
    total_sessions: 316,
    total_users: 123,
    created_at: new Date(),
  },
  {
    id: "m5gr84i9",
    title: "ken98@yahoo.com",
    status: "DRAFT",
    total_question: 316,
    avg_answer: 123,
    avg_correct_answer: 316,
    avg_score: 123,
    total_sessions: 316,
    total_users: 123,
    created_at: new Date(),
  },
];

export const DashboardTable = () => {
  const table = useReactTable({
    data,
    columns: dashboardcolumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="flex h-full w-full flex-col gap-2">
      <ScrollArea
        className="relative flex w-full rounded-md border shadow-md"
        viewportClassname="max-h-96"
      >
        <Table className="max-h-80">
          <TableHeader className="sticky top-0 bg-secondary">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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
                  colSpan={dashboardcolumns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <TablePagination table={table} />
    </div>
  );
};
