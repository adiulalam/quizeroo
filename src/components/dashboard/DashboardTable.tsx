import {
  type ColumnDef,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { useState } from "react";
import { TablePagination } from "../ui/TablePagination";
import { ScrollArea, ScrollBar } from "../ui/ScrollArea";
import type { Status } from "@prisma/client";
import { format } from "date-fns";
import { enGB } from "date-fns/locale";

export type DashboardColumnType = {
  id: string;
  title: string;
  status: Status;
  total_question: number;
  avg_answer: number;
  avg_correct_answer: number;
  avg_score: number;
  total_sessions: number;
  total_users: number;
  created_at: Date;
};

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
];

export const columns: ColumnDef<DashboardColumnType>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("title")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "total_question",
    header: () => <div className="text-right">Total Question</div>,
    cell: ({ row }) => (
      <div className="text-right font-medium">
        {row.getValue("total_question")}
      </div>
    ),
  },
  {
    accessorKey: "avg_answer",
    header: () => <div className="text-right">Avg Answer</div>,
    cell: ({ row }) => (
      <div className="text-right font-medium">{row.getValue("avg_answer")}</div>
    ),
  },
  {
    accessorKey: "avg_correct_answer",
    header: () => <div className="text-right">Avg Correct Answer</div>,
    cell: ({ row }) => (
      <div className="text-right font-medium">
        {row.getValue("avg_correct_answer")}
      </div>
    ),
  },
  {
    accessorKey: "avg_score",
    header: () => <div className="text-right">Avg Score</div>,
    cell: ({ row }) => (
      <div className="text-right font-medium">{row.getValue("avg_score")}</div>
    ),
  },
  {
    accessorKey: "total_sessions",
    header: () => <div className="text-right">Total Sessions</div>,
    cell: ({ row }) => (
      <div className="text-right font-medium">
        {row.getValue("total_sessions")}
      </div>
    ),
  },
  {
    accessorKey: "total_users",
    header: () => <div className="text-right">Total Users</div>,
    cell: ({ row }) => (
      <div className="text-right font-medium">
        {row.getValue("total_users")}
      </div>
    ),
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="float-right"
        >
          Created At
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-right font-medium">
        {format(row.getValue("created_at"), "PP", { locale: enGB })}
      </div>
    ),
    sortingFn: "datetime",
  },
];

export const DashboardTable = () => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
    },
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
                  colSpan={columns.length}
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
