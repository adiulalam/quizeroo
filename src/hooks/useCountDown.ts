import { api } from "@/utils/api";
import { useEffect, useState } from "react";
import { useCurrentQuestion } from "./useCurrentQuestion";
import { useQuizSession } from "./useQuizSession";

type useCountDownT = { start: number; callback?: () => void };

export const useCountDown = ({ start, callback }: useCountDownT) => {
  const [counter, setCounter] = useState(start);
  const { currentQuestionId } = useCurrentQuestion();
  const { id } = useQuizSession();

  const { mutate } = api.quizSession.updateCountdown.useMutation();

  useEffect(() => {
    if (currentQuestionId) {
      mutate({ countdown: counter, id, currentQuestionId });
    }

    if (counter <= 0) {
      callback && callback();
      return;
    }

    setTimeout(() => {
      setCounter(counter - 1);
    }, 1000);
  }, [counter, callback, mutate, id, currentQuestionId]);

  return counter;
};
