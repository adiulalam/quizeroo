import { type ChartConfig } from "@/components/ui/Chart";

export const serveChartConfig = {
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
