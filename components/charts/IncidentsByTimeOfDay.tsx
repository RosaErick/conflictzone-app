import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import { OccurrenceData } from "@/app/map/page"; // Make sure this path is correct

interface TimeOfDayData {
  timeOfDay: string;
  occurrences: number;
}

interface IncidentsByTimeOfDayProps {
  data: OccurrenceData[];
}

// Utility function to categorize data by time of day
const categorizeByTimeOfDay = (data: OccurrenceData[]) => {
  const timeOfDayCounts: Record<string, number> = {
    Madrugada: 0,
    Manhã: 0,
    Tarde: 0,
    Noite: 0,
  };

  data.forEach((occurrence) => {
    const hour = new Date(occurrence.date).getHours();

    if (hour >= 1 && hour < 5) timeOfDayCounts["Madrugada"]++;
    else if (hour >= 5 && hour < 12) timeOfDayCounts["Manhã"]++;
    else if (hour >= 12 && hour < 18) timeOfDayCounts["Tarde"]++;
    else if (hour >= 18 && hour < 22) timeOfDayCounts["Noite"]++;
    else timeOfDayCounts["Noite"]++;
  });

  return Object.entries(timeOfDayCounts).map(([timeOfDay, count]) => ({
    timeOfDay,
    occurrences: count,
  }));
};

const IncidentsByTimeOfDay: React.FC<IncidentsByTimeOfDayProps> = ({
  data,
}) => {
  const timeOfDayData = categorizeByTimeOfDay(data);

  return (
    <div style={{ height: "400px" }}>
      <h2 className="scroll-m-20 text-1xl font-bold tracking-tight lg:text-1xl mt-10 text-center">
        Ocorrências por horário do dia
      </h2>

      <ResponsiveBar
        data={timeOfDayData}
        keys={["occurrences"]}
        indexBy="timeOfDay"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "nivo" }}
        borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,

          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Occurrences",
          legendPosition: "middle",
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        animate={true}
      />
    </div>
  );
};

export default IncidentsByTimeOfDay;
