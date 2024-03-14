import { OccurrenceData } from "@/app/map/page";
import LineChart from "./charts/LineChart";

export const LineChartCard: React.FC<{ data: OccurrenceData[] }> = ({
  data,
}) => {
  
  
  return <LineChart data={data} />
};
