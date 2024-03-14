import React from "react";
import { ResponsiveBar } from "@nivo/bar";

// Define the data type
type BarChartData = {
  [key: string]: string | number;
};

interface BarChartProps {
  data: BarChartData[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  // Function to calculate color gradient
  const getColor = (bar: any) => {
    const barIndex = data.findIndex((d) => d.city === bar.indexValue);
    const colorStart = [255, 0, 0]; // red
    const colorEnd = [0, 128, 0]; // green
    const percent = barIndex / (data.length - 1);
    const color = colorStart.map((part, index) => {
      const diff = colorEnd[index] - part;
      return Math.round(part + diff * percent);
    });
    return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <ResponsiveBar
        data={data}
        keys={["occurrences"]}
        indexBy="city"
        margin={{ top: 50, right: 130, bottom: 120, left: 60 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={getColor}
        borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        axisTop={null}
        tooltip={({ data }) => (
          <span>
            {data.city}: {data.occurrences}
          </span>
        )}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 45,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Ocorrências",
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

export default BarChart;
