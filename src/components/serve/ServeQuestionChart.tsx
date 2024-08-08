import { Bar, BarChart, CartesianGrid, LabelList } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/Chart";
import { type LucideIcon } from "lucide-react";
import type { Props } from "recharts/types/component/Label";
import { useAnswerCounter, useCurrentQuestion } from "@/hooks";
import { useMemo } from "react";
import { shapeMap, answerMap } from "@/utils/constants";

const chartConfig = {
  total: {
    label: "Total",
  },
  triangle: {
    label: "Triangle",
    color: "var(--triangle)",
  },
  diamond: {
    label: "Diamond",
    color: "var(--diamond)",
  },
  circle: {
    label: "Circle",
    color: "hsl(var(--circle))",
  },
  square: {
    label: "Square",
    color: "hsl(var(--square))",
  },
} satisfies ChartConfig;

const renderCustomizedLabel = (props: Props) => {
  const { width, height } = props;
  const value = props.value as keyof typeof shapeMap;

  const Icon = shapeMap[value].Icon;

  // sometimes my genius scares me
  const minSize = Math.min(Number(width), Number(height));

  const size = minSize - minSize / 8;

  const x = (Number(props.x) ?? 0) + (Number(width) - size) / 2;
  const y = Number(props.y) ?? 0;

  return <Icon x={x} y={y} size={size} />;
};

export const ServeQuestionChart = () => {
  const { currentQuestion } = useCurrentQuestion();
  const { answers: userSubmissionAnswers } = useAnswerCounter();

  const chartData = useMemo(() => {
    const answers = currentQuestion?.answers ?? [];

    const result = [] as {
      shape: string;
      total: number;
      fill: string;
      Icon: LucideIcon;
    }[];

    userSubmissionAnswers.forEach((userAnswer) => {
      const userAnswerId = userAnswer.answerId;

      const index = answers.findIndex((answer) => answer.id === userAnswerId);
      const shape = answerMap[index] ?? "triangle";

      const existingEntry = result.find((entry) => entry.shape === shape);

      if (existingEntry) {
        existingEntry.total += 1;
      } else {
        const fill = shapeMap[shape].color;
        const Icon = shapeMap[shape].Icon;
        result.push({ shape, total: 1, fill, Icon });
      }
    });

    return result;
  }, [currentQuestion?.answers, userSubmissionAnswers]);

  const totalSubmission = userSubmissionAnswers.length;

  return (
    <div className="flex h-full w-full items-center justify-center">
      <Card className="h-auto w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Total submission: {totalSubmission}</CardTitle>
        </CardHeader>
        <CardContent hidden={totalSubmission <= 0}>
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={chartData}
              margin={{
                top: 20,
                bottom: 20,
              }}
            >
              <CartesianGrid vertical={false} />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar
                dataKey="total"
                strokeWidth={2}
                radius={8}
                label={{ position: "bottom", fontSize: 20 }}
              >
                <LabelList
                  dataKey="shape"
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                  content={({ value, ...rest }) =>
                    renderCustomizedLabel({ ...rest, value })
                  }
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};
