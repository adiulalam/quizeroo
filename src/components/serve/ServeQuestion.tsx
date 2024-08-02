import { ServeQuestionAnswer, ServeQuestionInfo } from ".";

export const ServeQuestion = () => {
  return (
    <div className="flex h-full w-full flex-col gap-2">
      <ServeQuestionInfo />
      <ServeQuestionAnswer />
    </div>
  );
};
