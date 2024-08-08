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
    color: "var(--circle)",
  },
  square: {
    label: "Square",
    color: "var(--square)",
  },
} satisfies ChartConfig;
