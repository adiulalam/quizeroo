import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  type ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/Chart";
import { api } from "@/utils/api";
import { ChartWrapper } from ".";
import { Skeleton } from "../ui/Skeleton";
import { ErrorBox } from "../ui/ErrorBox";

const chartConfig = {
  score: {
    label: "Score",
  },
} satisfies ChartConfig;

export const DashboardBarchart = () => {
  const { data, isLoading, isError, refetch } =
    api.dashboard.getDashboardBarchart.useQuery();

  const props = {
    title: "Top Quizzes",
    description: "Top Performing Quizzes by Average Score",
    config: chartConfig,
  };

  if (isLoading) {
    return (
      <ChartWrapper {...props}>
        <Skeleton className="h-full w-full" />
      </ChartWrapper>
    );
  }

  if (isError) {
    return (
      <ChartWrapper {...props}>
        <ErrorBox refetch={refetch} description="" header="" />
      </ChartWrapper>
    );
  }
  return (
    <ChartWrapper {...props}>
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="quiz"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(_, index) => (index + 1).toString()}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Bar dataKey="score" radius={8} />
      </BarChart>
    </ChartWrapper>
  );
};
