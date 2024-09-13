import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { format } from "date-fns";
import { enGB } from "date-fns/locale";
import type { DashboardColumnType } from "@/types/Dashboard.types";

export const dashboardcolumns: ColumnDef<DashboardColumnType>[] = [
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
