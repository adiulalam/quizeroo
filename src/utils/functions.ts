import { Filter, Order, Sort } from "@/types/Quiz.types";
import { filterLists, sortLists } from "@/utils/constants";

export const getSortBy = (sort_by: string): Sort => {
  const sortList = sortLists.find(
    ({ value }) => value === (sort_by as keyof typeof Sort),
  );

  if (sortList) return sortList.value;
  return Sort.updatedAt;
};

export const getFilterBy = (filter_by: string): Filter => {
  const filterList = filterLists.find(
    ({ value }) => value === (filter_by as keyof typeof Filter),
  );

  if (filterList) return filterList.value;
  return Filter.all;
};

export const getOrderBy = (filter_by: string): Order => {
  if ((filter_by as keyof typeof Order) === Order.asc) return Order.asc;

  return Order.desc;
};
