import { useEffect, useState } from "react";

type useCountDownT = { start: number; callback?: () => void };

export const useCountDown = ({ start, callback }: useCountDownT) => {
  const [counter, setCounter] = useState(start);

  useEffect(() => {
    if (counter <= 0) {
      callback && callback();
      return;
    }

    setTimeout(() => {
      setCounter(counter - 1);
    }, 1000);
  }, [counter, callback]);

  return counter;
};
