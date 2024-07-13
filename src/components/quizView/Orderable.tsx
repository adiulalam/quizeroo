import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { Order } from "@/types/Quiz.types";
import { Toggle } from "../ui/Toggle";
import { ArrowDownZA, ArrowUpAZ } from "lucide-react";

export const Orderable = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const search = searchParams.get("order_by");

  const isAsc = search === Order.asc;

  const onChangeHandler = () => {
    const value = isAsc ? Order.desc : Order.asc;
    void router.replace({
      query: { ...router.query, order_by: value },
    });
  };

  return (
    <Toggle
      variant="outline"
      aria-label="Toggle order"
      onPressedChange={onChangeHandler}
    >
      {isAsc ? (
        <ArrowUpAZ className="size-4" />
      ) : (
        <ArrowDownZA className="size-4" />
      )}
    </Toggle>
  );
};
