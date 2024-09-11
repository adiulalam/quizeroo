import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { type ChartConfig, ChartContainer } from "@/components/ui/Chart";

type ChartContainerType = {
  children: React.ReactNode & React.ReactElement;
  config: ChartConfig;
  title: string;
  description?: string;
};

export const ChartWrapper = ({
  children,
  config,
  title,
  description,
}: ChartContainerType) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ChartContainer config={config}>{children}</ChartContainer>
      </CardContent>
    </Card>
  );
};
