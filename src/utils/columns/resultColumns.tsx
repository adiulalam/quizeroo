import { type ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/Button";
import { ArrowUpDown, Crown } from "lucide-react";
import type { ScoreResult } from "@/types/Serve.types";

export const resultColumns: ColumnDef<ScoreResult>[] = [
  {
    accessorKey: "rank",
    header: "Rank",
    cell: ({ getValue }) => {
      const value = getValue() as string | number;

      return (
        <div className="flex items-center justify-center gap-2">
          {value == 1 && <Crown className="size-4 fill-primary" />}
          <span>{value}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "score",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Score
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
  },
];
