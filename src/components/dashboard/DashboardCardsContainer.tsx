import { DashboardCard, DashboardCardsPagination, DashboardCardsTabs } from ".";
import { useSearchParams } from "next/navigation";
import { Interval } from "@/types/Dashboard.types";
import { getIntervalBy } from "@/utils/functions";
import { api, type RouterOutputs } from "@/utils/api";
import { useEffect, useState } from "react";

type CardsDataType = RouterOutputs["dashboard"]["getDashboardCards"];

export const DashboardCardsContainer = () => {
  const [cardsData, setCardsData] = useState<CardsDataType>([]);

  const searchParams = useSearchParams();
  const interval_by = searchParams.get("interval_by") ?? Interval.week;
  const interval = getIntervalBy(interval_by);

  const { data, isSuccess, isLoading, isError } =
    api.dashboard.getDashboardCards.useQuery({ interval });

  useEffect(() => {
    data && isSuccess && setCardsData(data);
  }, [data, isSuccess]);

  if (isLoading) {
    return <p>loading</p>;
  }

  if (isError || !data) {
    return <p>error</p>;
  }

  return (
    <div className="flex flex-col gap-2">
      <DashboardCardsTabs />

      <div className="flex flex-col gap-1">
        <div className="flex w-[calc(100dvw-2rem)] flex-nowrap gap-1 overflow-x-hidden sm:w-full sm:flex-wrap sm:overflow-x-auto">
          {cardsData.map((card) => (
            <DashboardCard key={card.id} card={card} />
          ))}
        </div>
        <DashboardCardsPagination
          cardsData={cardsData}
          setCardsData={setCardsData}
        />
      </div>
    </div>
  );
};
