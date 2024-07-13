import { filterLists } from "@/utils/constants";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

export const Filterable = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const search = searchParams.get("filter_by");

  const value = filterLists.find(({ value }) => value === search)?.value;

  const onChangeHandler = (selectedValue: string) => {
    void router.replace({
      query: { ...router.query, filter_by: selectedValue },
    });
  };

  return (
    <Tabs
      defaultValue="all"
      value={value}
      onValueChange={onChangeHandler}
      className="max-w-full flex-1 lg:max-w-96"
    >
      <div className="flex items-center">
        <TabsList className="w-full">
          {filterLists.map((list) => (
            <TabsTrigger
              className="flex-grow"
              key={list.value}
              value={list.value}
            >
              {list.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
    </Tabs>
  );
};
