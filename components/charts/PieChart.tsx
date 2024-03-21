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
  const chartData: PieChartData[] = Object.keys(data).map((key) => ({
    id: key,
    label: key,
    value: data[key],
  }));

  return (
    <div style={{ height: 450 }}>
      <ResponsivePie
        data={chartData}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        colors={{ scheme: "nivo" }}
        borderWidth={1}
        borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsThickness={2}
        arcLabelsSkipAngle={10}
        animate={true}

        tooltip={({ datum }) => (
          <span>
            {datum.label}: {datum.value}
          </span>
        )}
      />
    </div>
  );
};

export default PieChart;
