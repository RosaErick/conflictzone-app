import { OccurrenceData } from "@/app/map/page";
import PieChart from "./charts/PieChart";

interface OccurrenceTypeCount {
  [key: string]: number;
}

export const PieChartCard: React.FC<{ data: OccurrenceData[] }> = ({
  data,
}) => {
  const occurrenceTypes = data.reduce<OccurrenceTypeCount>((acc, data) => {
    const type = data.context_info.mainReason.name;
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  return <PieChart data={occurrenceTypes} />;
};
