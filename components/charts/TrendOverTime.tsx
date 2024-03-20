import React from "react";
import { ResponsiveLine } from "@nivo/line";
import { OccurrenceData } from "@/app/map/page"; // Make sure this path is correct

interface TrendOverTimeProps {
  data: OccurrenceData[];
}

// Utility function to group data by date
const groupByDate = (data: OccurrenceData[]) => {
  const occurrencesByDate: Record<string, number> = {};

  data.forEach((occurrence) => {
    const date = occurrence.date.split("T")[0]; // Assuming the date is in ISO format
    occurrencesByDate[date] = (occurrencesByDate[date] || 0) + 1;
  });

  return Object.entries(occurrencesByDate).map(([date, count]) => ({
    x: date,
    y: count,
  }));
};

const TrendOverTime: React.FC<TrendOverTimeProps> = ({ data }) => {
  const seriesData = [
    {
      id: "Occurrences",
      data: groupByDate(data),
    },
  ];

  return (
    <div style={{ height: "400px" }}>
      <h2 className="scroll-m-20 text-1xl font-bold tracking-tight lg:text-1xl mt-10 text-center">
        Ocorrências ao longo do tempo
      </h2>

      <ResponsiveLine
        data={seriesData}
        margin={{ top: 50, right: 20, bottom: 50, left: 60 }}
        xScale={{ type: "time", format: "%Y-%m-%d", precision: "day" }}
        xFormat="time:%Y-%m-%d"
        yScale={{ type: "linear", min: "auto", max: "auto", stacked: false }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          format: "%b  %Y",

          legend: "Date",
          legendPosition: "middle",

          tickSize: 5,
          tickPadding: 5,
          tickRotation: -45,

          legendOffset: 80,
        }}
        axisLeft={{
          legend: "Número de Ocorrências",
          legendPosition: "middle",
          legendOffset: -50,
        }}
        enablePoints={false}
        enableGridX={false}
        enableGridY={true}
        colors={{ scheme: "set3" }}
        useMesh={true}
        animate={true}
      />
    </div>
  );
};

export default TrendOverTime;
