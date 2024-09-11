import { Tabs, TabsList, TabsTrigger } from "../ui/Tabs";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import { intervalLists } from "@/utils/constants";

export const DashboardCardsTabs = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("interval_by");
  const value = intervalLists.find(({ value }) => value === search)?.value;

  const onChangeHandler = (selectedValue: string) => {
    void router.replace(
      {
        query: { ...router.query, interval_by: selectedValue },
      },
      undefined,
      { shallow: true },
    );
  };

  return (
    <Tabs defaultValue="week" value={value} onValueChange={onChangeHandler}>
      <TabsList className="w-full max-w-sm">
        <TabsTrigger value="day" className="flex-grow">
          Day
        </TabsTrigger>
        <TabsTrigger value="week" className="flex-grow">
          Week
        </TabsTrigger>
        <TabsTrigger value="month" className="flex-grow">
          Month
        </TabsTrigger>
        <TabsTrigger value="all" className="flex-grow">
          All
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
