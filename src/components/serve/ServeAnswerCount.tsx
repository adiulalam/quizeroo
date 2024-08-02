import { useAnswerCounter } from "@/hooks";

export const ServeAnswerCount = () => {
  const { answerCount } = useAnswerCounter();

  return (
    <div className="flex flex-col items-center justify-center">
      <h3 className="w-full scroll-m-20 truncate text-lg font-normal tracking-tight sm:text-2xl">
        Answers
      </h3>
      <h3 className="w-full scroll-m-20 truncate text-center text-lg font-bold tracking-tight sm:text-2xl">
        {answerCount}
      </h3>
    </div>
  );
};
