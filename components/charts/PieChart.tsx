// src/components/PieChart.tsx
import React from "react";
import { ResponsivePie } from "@nivo/pie";

interface PieChartData {
  id: string;
  label: string;
  value: number;
}

interface PieChartProps {
  data: Record<string, number>;
}

const PieChart = ({ data }: PieChartProps) => {
  // Convert the data to a format that Nivo can understand
  const chartData: PieChartData[] = Object.keys(data).map((key) => ({
    id: key,
    label: key,
    value: data[key],
  }));

  return (
    <div style={{ height: 400 }}>
      {" "}
      {/* Adjust size as needed */}
      <ResponsivePie
        data={chartData}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        colors={{ scheme: "nivo" }} // You can customize the color scheme
        borderWidth={1}
        borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
      />
    </div>
  );
};

export default PieChart;
