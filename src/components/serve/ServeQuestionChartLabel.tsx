import type { Props } from "recharts/types/component/Label";
import { shapeMap } from "@/utils/constants";

export const ServeQuestionChartLabel = (props: Props) => {
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
