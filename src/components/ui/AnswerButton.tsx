import { useMemo } from "react";
import { Button } from "../ui/Button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/theme";
import { Check, Circle, Diamond, Square, Triangle, X } from "lucide-react";

export const answerButtonVariants = cva("", {
  variants: {
    variant: {
      triangle:
        "bg-rose-700 dark:bg-rose-500 hover:bg-rose-500 dark:hover:bg-rose-700",
      diamond:
        "bg-blue-700 dark:bg-blue-500 hover:bg-blue-500 dark:hover:bg-blue-700",
      circle:
        "bg-yellow-700 dark:bg-yellow-500 hover:bg-yellow-500 dark:hover:bg-yellow-700",
      square:
        "bg-green-700 dark:bg-green-500 hover:bg-green-500 dark:hover:bg-green-700",
    },
    iconSize: {
      small: "size-4",
      medium: "size-6",
      large: "size-8",
      xLarge: "size-10",
      auto: "size-auto",
    },
  },
  defaultVariants: {},
});

export interface AnswerButton
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof answerButtonVariants> {
  iconClassName?: React.SVGAttributes<HTMLOrSVGElement>["className"];
  showAnswer?: { isCorrectAnswer: boolean };
}

export const AnswerButton = ({
  className,
  variant,
  iconSize,
  iconClassName,
  children,
  showAnswer,
  ...props
}: AnswerButton) => {
  const Icon = useMemo(() => {
    if (variant === "triangle") return Triangle;
    if (variant === "diamond") return Diamond;
    if (variant === "circle") return Circle;
    if (variant === "square") return Square;

    throw new Error("Invalid variant name");
  }, [variant]);

  const AnswerIcon = useMemo(() => {
    if (showAnswer?.isCorrectAnswer) return Check;

    return X;
  }, [showAnswer]);

  return (
    <Button
      className={cn(answerButtonVariants({ variant, className }))}
      {...props}
    >
      {showAnswer && (
        <AnswerIcon
          className={cn(
            answerButtonVariants({ iconSize }),
            "text-white",
            iconClassName,
          )}
        />
      )}
      <Icon
        className={cn(
          answerButtonVariants({ iconSize }),
          "fill-white text-white",
          iconClassName,
        )}
      />
      {children}
    </Button>
  );
};
