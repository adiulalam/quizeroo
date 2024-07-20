import { useFieldArray } from "react-hook-form";
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { useQuestionForm } from "@/hooks/useQuestionForm";
import { QuestionProvider } from "@/provider";
import { QuestionCollapse } from ".";
import { api } from "@/utils/api";

export const QuestionsDragable = () => {
  const { question } = api.useUtils();

  const { control, getValues } = useQuestionForm();

  const { fields, move } = useFieldArray({
    control,
    name: "questions",
    keyName: "fieldId",
  });

  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const keyboardSensor = useSensor(KeyboardSensor);

  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

  const { mutate } = api.question.updateQuestionOrder.useMutation({
    onSuccess: () => {
      void question.getQuestions.invalidate();
    },
  });

  const onDragHandler = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over == null) return;

    if (active.id !== over.id) {
      const oldIndex = fields.findIndex((field) => field.id === active.id);
      const newIndex = fields.findIndex((field) => field.id === over.id);
      move(oldIndex, newIndex);

      const data = getValues();
      const questions = data.questions.map(({ id }, index) => ({
        id,
        order: index,
      }));

      mutate(questions);
    }
  };

  return (
    <DndContext onDragEnd={onDragHandler} sensors={sensors}>
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
