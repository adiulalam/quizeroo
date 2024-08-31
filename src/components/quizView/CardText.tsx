import { CardTitle } from "@/components/ui/Card";
import { useViewQuiz } from "@/hooks";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/Tooltip";

export const CardText = () => {
  const { title } = useViewQuiz();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <CardTitle className="truncate" data-testid="header-quiz-title">
            {title}
          </CardTitle>
        </TooltipTrigger>
        <TooltipContent>
          <p>{title}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
