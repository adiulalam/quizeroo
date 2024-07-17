import { Button } from "../ui/Button";
import { Trash2 } from "lucide-react";

export const QuestionCollapseDelete = () => {
  return (
    <Button variant="destructive" size="sm" className="p-1 sm:p-2">
      <Trash2 />
    </Button>
  );
};
