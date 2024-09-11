import { Interval } from "@/types/Dashboard.types";
import { Filter, Order, Sort } from "@/types/Quiz.types";
import { filterLists, intervalLists, sortLists } from "@/utils/constants";
import { cva } from "class-variance-authority";
import {
  format,
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  subDays,
  subWeeks,
  subMonths,
} from "date-fns";

export const getSortBy = (sort_by: string): Sort => {
  const sortList = sortLists.find(
    ({ value }) => value === (sort_by as keyof typeof Sort),
  );

  if (sortList) return sortList.value;
  return Sort.updatedAt;
};

export const getFilterBy = (filter_by: string): Filter => {
  const filterList = filterLists.find(
    ({ value }) => value === (filter_by as keyof typeof Filter),
  );

  if (filterList) return filterList.value;
  return Filter.all;
};

export const getOrderBy = (filter_by: string): Order => {
  if ((filter_by as keyof typeof Order) === Order.asc) return Order.asc;

  return Order.desc;
};

export const getIntervalBy = (interval_by: string): Interval => {
  const intervalList = intervalLists.find(
    ({ value }) => value === (interval_by as keyof typeof Interval),
  );

  if (intervalList) return intervalList.value;
  return Interval.week;
};

export const draggingVariants = cva(
  "flex flex-col gap-4 rounded bg-muted/10 border border-muted p-2 snap-center",
  {
    variants: {
      dragging: {
        default: "border-2 border-transparent",
        over: "ring-2 opacity-30",
        overlay: "ring-2 ring-primary",
      },
    },
  },
);

export const calculateScore = ({
  maxCounter,
  currentCounter,
  isCorrect,
}: {
  maxCounter: number;
  currentCounter: number;
  isCorrect: boolean;
}) => {
  if (!isCorrect) return 0;

  const maxScore = 100;

  // Handle edge case where maxCounter is 0 to prevent division by zero.
  if (maxCounter <= 0) return 0;

  // Calculate the score.
  const score = Math.floor((maxScore / maxCounter) * currentCounter);

  // Cap the score at maxScore.
  return Math.min(score, maxScore);
};

export const roundIfNessesary = (input: number | string, maxRound = 1) => {
  input ||= 0;
  const inputToString = input.toString();
  return parseFloat(inputToString).toFixed(maxRound);
};

export const getTimeFrame = (interval: Interval) => {
  const today = new Date();
  let startTime, endTime, previousStartTime, previousEndTime;

  switch (interval) {
    case Interval.day:
      startTime = startOfDay(today);
      endTime = endOfDay(today);
      previousStartTime = startOfDay(subDays(today, 1));
      previousEndTime = endOfDay(subDays(today, 1));
      break;
    case Interval.week:
      startTime = startOfWeek(today);
      endTime = endOfWeek(today);
      previousStartTime = startOfWeek(subWeeks(today, 1));
      previousEndTime = endOfWeek(subWeeks(today, 1));
      break;
    case Interval.month:
      startTime = startOfMonth(today);
      endTime = endOfMonth(today);
      previousStartTime = startOfMonth(subMonths(today, 1));
      previousEndTime = endOfMonth(subMonths(today, 1));
      break;
    case Interval.all:
      startTime = new Date(1970, 0, 1); // 1-1-1970
      endTime = today;

      previousStartTime = new Date(1970, 0, 1); // 1-1-1970
      previousEndTime = today;
      break;
    default:
      throw new Error("Invalid interval");
  }

  return { startTime, endTime, previousStartTime, previousEndTime };
};

// Helper function to calculate percentage change
export const calculatePercentageChange = (
  current: number,
  previous: number,
) => {
  if (previous === 0) return current === 0 ? 0 : 100; // If previous is 0 and current is not 0, it is 100% change
  return ((current - previous) / Math.abs(previous)) * 100;
};

export const getPercentageSign = (percentage: number) => {
  if (percentage > 0) return "+";
  if (percentage < 0) return "-";
  return ""; // No sign for 0%
};

export const generateMonthDetailsArray = (maxMonth = 12) => {
  const monthsArray = Array.from({ length: maxMonth }, (_, index) => {
    const date = subMonths(new Date(), index);
    const startDate = startOfMonth(date);
    const endDate = endOfMonth(date);

    return {
      id: index + 1,
      index,
      month: format(startDate, "MMMM"),
      short_month: format(startDate, "MMM"),
      start_date: format(startDate, "d"),
      end_date: format(endDate, "d"),
      year: format(startDate, "yyyy"),
      iso_start_date: format(startDate, "yyyy-MM-dd"),
      iso_end_date: format(endDate, "yyyy-MM-dd"),
    };
  }).reverse();

  return monthsArray;
};
