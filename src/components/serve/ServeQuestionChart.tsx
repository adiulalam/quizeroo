import { Bar, BarChart, CartesianGrid, LabelList } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/Chart";
import { useAnswerCounter, useCurrentQuestion } from "@/hooks";
import { useMemo } from "react";
import { shapeMap, answerMap } from "@/utils/constants";
import { ServeQuestionChartLabel } from ".";
import { serveChartConfig } from "@/utils/config";

type ResultType = {
  shape: string;
  total: number;
  fill: string;
}[];

export const ServeQuestionChart = () => {
  const { currentQuestion } = useCurrentQuestion();
  const { answers: userSubmissionAnswers } = useAnswerCounter();

  const chartData = useMemo(() => {
    const answers = currentQuestion?.answers ?? [];

    const result = [] as ResultType;

    userSubmissionAnswers.forEach((userAnswer) => {
      const userAnswerId = userAnswer.answerId;

      const index = answers.findIndex((answer) => answer.id === userAnswerId);
      const shape = answerMap[index] ?? "triangle";

      const existingEntry = result.find((entry) => entry.shape === shape);

      if (existingEntry) {
        existingEntry.total += 1;
      } else {
        const fill = shapeMap[shape].color;
        result.push({ shape, total: 1, fill });
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
          <ChartContainer config={serveChartConfig}>
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
                  fontSize={12}
                  content={ServeQuestionChartLabel}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};
