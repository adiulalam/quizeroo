import { useFieldArray } from "react-hook-form";
import { DndContext } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { useQuestionForm } from "@/hooks/useQuestionForm";
import { QuestionProvider } from "@/provider";
import { QuestionCollapse } from ".";

export const QuestionsDragable = () => {
  const { control } = useQuestionForm();

  const { fields, move } = useFieldArray({
    control,
    name: "questions",
    keyName: "fieldId",
  });

  return (
    <DndContext
      onDragEnd={(event) => {
        const { active, over } = event;
        if (over == null) return;

        if (active.id !== over.id) {
          const oldIndex = fields.findIndex((field) => field.id === active.id);
          const newIndex = fields.findIndex((field) => field.id === over.id);
          move(oldIndex, newIndex);
        }
      }}
    >
      <SortableContext items={fields}>
        {fields.map((field, index) => (
          <QuestionProvider key={field.id} value={{ ...field, index }}>
            <QuestionCollapse />
          </QuestionProvider>
        ))}
      </SortableContext>
    </DndContext>
  );
};
