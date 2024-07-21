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
import { useQuestion, useQuestionForm } from "@/hooks";
import { AnswerProvider } from "@/provider";
import { AnswerForm } from ".";
import { api } from "@/utils/api";

export const AnswersDragable = () => {
  const { id, index } = useQuestion();
  const { question } = api.useUtils();

  const { control, getValues } = useQuestionForm();

  const { fields, move } = useFieldArray({
    control,
    name: `questions.${index}.answers`,
    keyName: "fieldId",
  });

  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const keyboardSensor = useSensor(KeyboardSensor);

  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

  const { mutate } = api.answer.updateAnswerOrder.useMutation({
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
      const question = data.questions.find((question) => question.id === id);
      const answers = question!.answers.map(({ id }, index) => ({
        id,
        order: index,
      }));

      mutate(answers);
    }
  };

  return (
    <DndContext onDragEnd={onDragHandler} sensors={sensors}>
      <SortableContext items={fields}>
        {fields.map((field, index) => (
          <AnswerProvider key={field.id} value={{ ...field, index }}>
            <AnswerForm />
          </AnswerProvider>
        ))}
      </SortableContext>
    </DndContext>
  );
};
