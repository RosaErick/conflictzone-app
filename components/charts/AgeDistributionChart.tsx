import { OccurrenceData } from "@/app/map/page";
import { ResponsivePie } from "@nivo/pie"; // Import ResponsivePie instead of ResponsiveBar
import React from "react";

interface AgeDistributionData {
  id: string; // Changed to fit the pie chart requirements
  label: string;
  value: number;
}

interface AgeDistributionChartProps {
  data: OccurrenceData[];
}

const processAgeDistributionData = (
  data: OccurrenceData[]
): AgeDistributionData[] => {
  const ageGroupCounts: { [key: string]: number } = {};

  data.forEach((occurrence) => {
    occurrence.victims.forEach((victim) => {
      const ageGroup = victim.ageGroup.name;
      if (ageGroup) {
        if (!ageGroupCounts[ageGroup]) {
          ageGroupCounts[ageGroup] = 1;
        } else {
          ageGroupCounts[ageGroup]++;
        }
      }
    });
  });

  return Object.keys(ageGroupCounts).map((ageGroup) => ({
    id: ageGroup,
    label: ageGroup,
    value: ageGroupCounts[ageGroup],
  }));
};

const AgeDistributionChart: React.FC<AgeDistributionChartProps> = ({
  data,
}) => {
  const graphData = processAgeDistributionData(data);

  console.log("Pie Chart Data", graphData);

  return (
    <div style={{ height: 400, width: 500 }}>
      <ResponsivePie
        data={graphData}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        colors={{ scheme: "nivo" }}
        borderColor={{ from: "color", modifiers: [["darker", 0.6]] }}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
          
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
          },
        ]}
        animate={true}
      />
    </div>
  );
};

export default AgeDistributionChart;
