import {
  DashboardBarchart,
  DashboardCards,
  DashboardCardsTabs,
  DashboardLinechart,
} from ".";

export const DashboardContainer = () => {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex w-full flex-col gap-2">
        <DashboardCardsTabs />
        <DashboardCards />
      </div>

      <div className="grid w-full grid-cols-1 gap-1 md:grid-cols-2">
        <DashboardBarchart />
        <DashboardLinechart />
      </div>
    </div>
  );
};
