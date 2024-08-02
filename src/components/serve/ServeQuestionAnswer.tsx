import { AnswerButton } from "../ui/AnswerButton";

export const ServeQuestionAnswer = () => {
  return (
    <div className="flex h-full w-full flex-wrap">
      <div className="flex w-1/2 flex-grow p-2">
        <AnswerButton
          className="flex h-full w-full flex-col gap-2 sm:flex-row"
          iconClassName="size-10 sm:size-14"
          variant="triangle"
        >
          <h2 className="max-w-[80%] scroll-m-20 whitespace-normal text-center text-lg font-bold tracking-tight first:mt-0 sm:text-3xl">
            Answer 1
          </h2>
        </AnswerButton>
      </div>
      <div className="flex w-1/2 flex-grow p-2">
        <AnswerButton
          className="flex h-full w-full flex-col gap-2 sm:flex-row"
          iconClassName="size-10 sm:size-14"
          variant="square"
        >
          <h2 className="max-w-[80%] scroll-m-20 whitespace-normal text-center text-lg font-bold tracking-tight first:mt-0 sm:text-3xl">
            Answer 2
          </h2>
        </AnswerButton>
      </div>
      <div className="flex w-1/2 flex-grow p-2">
        <AnswerButton
          className="flex h-full w-full flex-col gap-2 sm:flex-row"
          iconClassName="size-10 sm:size-14"
          variant="diamond"
        >
          <h2 className="max-w-[80%] scroll-m-20 whitespace-normal text-center text-lg font-bold tracking-tight first:mt-0 sm:text-3xl">
            Answer 3
          </h2>
        </AnswerButton>
      </div>
      <div className="flex w-1/2 flex-grow p-2">
        <AnswerButton
          className="flex h-full w-full flex-col gap-2 sm:flex-row"
          iconClassName="size-10 sm:size-14"
          variant="circle"
        >
          <h2 className="max-w-[80%] scroll-m-20 whitespace-normal text-center text-lg font-bold tracking-tight first:mt-0 sm:text-3xl">
            Answer 4
          </h2>
        </AnswerButton>
      </div>
    </div>
  );
};
