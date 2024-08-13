import { useQuizSession } from "@/hooks";
import { api } from "@/utils/api";
import { useMemo, useState } from "react";
import {
  type SortingState,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { ScoreResult } from "@/types/Serve.types";
import { resultColumns } from "@/utils/columns/resultColumns";

export const useResultTable = () => {
  const { id } = useQuizSession();
  const quizSession = api.quizSession.getSessionScore.useQuery({ id });
  const [sorting, setSorting] = useState<SortingState>([]);

  const scoreResult: ScoreResult[] = useMemo(() => {
    if (!quizSession.data) return [];

    const result = quizSession.data.users
      .map((user) => {
        const score = user.userAnswers.reduce(
          (accumulator, currentValue) => accumulator + currentValue.score,
          0,
        );

        return { id: user.id, name: user.name ?? "Unknown", score };
      })
      .sort((a, b) => b.score - a.score)
      .map((user, index) => ({ ...user, rank: index + 1 }));

    return result;
  }, [quizSession.data]);

  const table = useReactTable({
    data: scoreResult,
    columns: resultColumns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
    },
  });

  return { ...quizSession, table, columnLength: resultColumns.length };
};
