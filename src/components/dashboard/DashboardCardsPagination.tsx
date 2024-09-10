import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/Pagination";
import type { RouterOutputs } from "@/utils/api";
import { cn } from "@/utils/theme";
import { useState } from "react";

type CardsDataType = RouterOutputs["dashboard"]["getDashboardCards"];

type DashboardCardsPaginationProps = {
  cardsData: CardsDataType;
  setCardsData: React.Dispatch<React.SetStateAction<CardsDataType>>;
};

export const DashboardCardsPagination = ({
  cardsData,
  setCardsData,
}: DashboardCardsPaginationProps) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    const length = cardsData?.length;
    const firstElement = cardsData.shift();
    setCardsData((prev) => (firstElement ? [...prev, firstElement] : prev));

    setActiveStep((prev) => (prev + 1) % length);
  };

  const handleBack = () => {
    const length = cardsData.length;
    const lastElement = cardsData.pop();
    const newArray = lastElement ? [lastElement, ...cardsData] : cardsData;
    setCardsData(newArray);

    setActiveStep((prev) => (prev - 1 + length) % length);
  };

  return (
    <Pagination className="flex rounded-lg border bg-card p-2 text-card-foreground shadow-sm sm:hidden">
      <PaginationContent className="flex w-full items-center justify-between gap-2">
        <PaginationItem>
          <PaginationPrevious onClick={handleBack} />
        </PaginationItem>

        <div className="flex gap-3">
          {cardsData.map((card, index) => (
            <div
              key={card.id}
              className={cn(
                "size-2 rounded-full",
                activeStep === index
                  ? "border bg-secondary shadow-sm"
                  : "bg-primary",
              )}
            />
          ))}
        </div>

        <PaginationItem>
          <PaginationNext onClick={handleNext} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
