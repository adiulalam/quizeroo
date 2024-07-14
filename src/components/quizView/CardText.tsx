import { CardTitle } from "@/components/ui/Card";
import { useViewQuiz } from "@/hooks/useViewQuiz";
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
          <CardTitle className="truncate">{title}</CardTitle>
        </TooltipTrigger>
        <TooltipContent>
          <p>{title}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
