import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { ArrowUpDown } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

const sortLists = [
  { name: "Status", value: "status" },
  { name: "Updated At", value: "updated_at" },
];

export const Sortable = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const search = searchParams.get("sort_by");

  const value = sortLists.find(({ value }) => value === search)?.value;

  const onChangeHandler = (selectedValue: string) => {
    void router.replace({
      query: { ...router.query, sort_by: selectedValue },
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="w-fit" variant="outline">
          <ArrowUpDown className="size-4" />
          <span className="ml-2 hidden md:block ">Sort By</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuRadioGroup value={value} onValueChange={onChangeHandler}>
          {sortLists.map((list, index) => (
            <DropdownMenuRadioItem key={index} value={list.value}>
              {list.name}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
