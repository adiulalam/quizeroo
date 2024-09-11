import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
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
  answer: {
    label: "Answers",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export const DashboardLinechart = () => {
  const { data, isLoading, isError, refetch } =
    api.dashboard.getDashboardLinechart.useQuery();

  const props = {
    title: "Correct Answers",
    description: "Correct Answer Rate Over Time",
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
      <LineChart
        accessibilityLayer
        data={data}
        margin={{
          left: 14,
          right: 14,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Line
          dataKey="answer"
          type="natural"
          stroke="var(--color-answer)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartWrapper>
  );
};
