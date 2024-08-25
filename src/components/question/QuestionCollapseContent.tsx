import { CollapsibleContent } from "../ui/Collapsible";
import { Label } from "../ui/Label";
import { AnswerCreate, AnswersDragable } from "../answer";
import { Separator } from "../ui/Separator";
import { QuestionTitle } from "./QuestionTitle";

export const QuestionCollapseContent = () => {
  return (
    <CollapsibleContent>
      <div className="flex flex-col gap-3">
        <QuestionTitle />
        <Separator />
        <div className="flex flex-col gap-2">
          <Label>Answers</Label>
          <AnswersDragable />
          <AnswerCreate />
        </div>
      </div>
    </CollapsibleContent>
  );
};
