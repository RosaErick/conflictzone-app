import { OccurrenceData } from "@/app/map/page";
import BarChart from "./charts/BarChart";

export const BarChartCard: React.FC<{ data: OccurrenceData[] }> = ({
  data,
}) => {
  const transformData = (data: OccurrenceData[]) => {
    const occurrenceCountByCity: Record<string, number> = {};

    data.forEach((occurrence) => {
      const cityName = occurrence.neighborhood?.name
        ? occurrence.neighborhood.name
        : "Não informado";
      occurrenceCountByCity[cityName] =
        (occurrenceCountByCity[cityName] || 0) + 1;
    });

    return Object.entries(occurrenceCountByCity).map(([city, count]) => ({
      city,
      occurrences: count,
    }));
  };

  const topN = 10;
  const graphData = transformData(data)
    .sort((a, b) => b.occurrences - a.occurrences)
    .slice(0, topN);

   return (
    <div>
   
      <BarChart data={graphData} />
    </div>
  );
};
