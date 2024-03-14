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

  return (
    <div>
      <h2 className="scroll-m-20 text-1xl font-bold tracking-tight lg:text-1xl mt-10 text-center">
        Ocorrências por tipo
      </h2>
      <PieChart data={occurrenceTypes} />
    </div>
  );
};

export default PieChartCard;
