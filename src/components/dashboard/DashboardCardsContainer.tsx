import { DashboardCards, DashboardCardsTabs } from ".";

export const DashboardCardsContainer = () => {
  return (
    <div className="flex flex-col gap-2">
      <DashboardCardsTabs />

      <DashboardCards />
    </div>
  );
};
