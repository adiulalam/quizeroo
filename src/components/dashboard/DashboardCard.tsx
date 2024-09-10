import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { DynamicIcon } from "../ui/DynamicIcon";
import { type RouterOutputs } from "@/utils/api";

type DashboardCardType = {
  card: RouterOutputs["dashboard"]["getDashboardCards"][number];
};

export const DashboardCard = ({ card }: DashboardCardType) => {
  return (
    <Card className="flex w-[calc(100dvw-2rem)] min-w-full flex-1 flex-col sm:w-72 sm:min-w-72">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
        <DynamicIcon name={card.icon} className="size-4 stroke-primary/60" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{card.data}</div>
        {card.description && (
          <p className="text-xs text-muted-foreground">{card.description}</p>
        )}
      </CardContent>
    </Card>
  );
};
