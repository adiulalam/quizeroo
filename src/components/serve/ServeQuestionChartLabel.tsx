import type { Props } from "recharts/types/component/Label";
import { shapeMap } from "@/utils/constants";
import { cn } from "@/utils/theme";
import { Check, X } from "lucide-react";

type LabelDataType = { shape: keyof typeof shapeMap; isCorrect: boolean };

export const ServeQuestionChartLabel = (props: Props) => {
  const { width, height } = props;
  const value = props.value as unknown as LabelDataType;

  // sometimes my genius scares me
  const minSize = Math.min(Number(width), Number(height));

  const size = minSize - minSize / 8;

  const x = (Number(props.x) ?? 0) + (Number(width) - size) / 2;
  const y = Number(props.y) ?? 0;

  const Shape = shapeMap[value.shape].Icon;
  const Icon = value.isCorrect ? Check : X;

  return (
    <>
      <Shape
        x={x}
        y={y}
        size={size}
        className={cn(
          "stroke-[0.5px]",
          value.isCorrect ? "fill-success" : "fill-destructive",
        )}
      />
      <Icon
        x={x + size / 4}
        y={y + size / 4}
        size={size / 2}
        className="stroke-2"
      />
    </>
  );
};
