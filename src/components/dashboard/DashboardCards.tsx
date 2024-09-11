import { DashboardCard, DashboardCardsPagination } from ".";
import { useSearchParams } from "next/navigation";
import { Interval } from "@/types/Dashboard.types";
import { getIntervalBy } from "@/utils/functions";
import { api, type RouterOutputs } from "@/utils/api";
import { useEffect, useState } from "react";
import { DashboardCardsSkeleton } from "../skeleton";
import { ErrorBox } from "../ui/ErrorBox";

type CardsDataType = RouterOutputs["dashboard"]["getDashboardCards"];

export const DashboardCards = () => {
  const [cardsData, setCardsData] = useState<CardsDataType>([]);

  const searchParams = useSearchParams();
  const interval_by = searchParams.get("interval_by") ?? Interval.week;
  const interval = getIntervalBy(interval_by);

  const { data, isSuccess, isLoading, isError, refetch } =
    api.dashboard.getDashboardCards.useQuery({ interval });

  useEffect(() => {
    data && isSuccess && setCardsData(data);
  }, [data, isSuccess]);

  if (isLoading) {
    return <DashboardCardsSkeleton />;
  }

  if (isError || !data) {
    return (
      <div className="flex h-48 w-full items-center justify-center rounded-lg border bg-card sm:h-64 xl:h-32">
        <ErrorBox refetch={refetch} description="" header="" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="flex w-[calc(100dvw-2rem)] flex-nowrap gap-1 overflow-x-hidden sm:w-full sm:flex-wrap">
        {cardsData.map((card) => (
          <DashboardCard key={card.id} card={card} />
        ))}
      </div>
      <DashboardCardsPagination
        cardsData={cardsData}
        setCardsData={setCardsData}
      />
    </div>
  );
};
