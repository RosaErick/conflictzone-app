import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { OccurrenceData } from "@/app/map/page"; // Assuming this import path is correct and OccurrenceData is defined here

interface DemographicData {
  id: string;
  label: string;
  value: number;
}

interface DemographicDistributionChartProps {
  data: OccurrenceData[];
  title: string; // "Gender Distribution" or "Race Distribution"
}

const processDemographicData = (
  data: OccurrenceData[],
  title: string
): DemographicData[] => {
  const countMap: { [key: string]: number } = {};

  data.forEach((occurrence) => {
    occurrence.victims.forEach((victim) => {
      let key = "";
      if (title === "Distribuição por Gênero") {
        key = victim.genre.name; // Assuming victim.genre exists and has a name property
      }

      if (title === "Distribuição por Cor") {
        key = victim.race; // Assuming victim has a race property
      }

      if (title === "Distribuição por Idade") {
        key = victim.ageGroup.name; // Assuming victim has an age property
      }

      if (key) {
        if (!countMap[key]) {
          countMap[key] = 1;
        } else {
          countMap[key]++;
        }
      }
    });
  });

  return Object.keys(countMap).map((key) => ({
    id: key,
    label: key,
    value: countMap[key],
  }));
};

const DemographicDistributionChart: React.FC<
  DemographicDistributionChartProps
> = ({ data, title }) => {
  const chartData = processDemographicData(data, title);

  return (
    <div style={{ height: 400 }}>
      <h2 className="scroll-m-20 text-1xl font-bold tracking-tight lg:text-1xl mt-10 text-center">
        {title}
      </h2>
      <ResponsivePie
        data={chartData}
        // Rest of the configuration remains the same
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        colors={{ scheme: "nivo" }}
        borderColor={{ from: "color", modifiers: [["darker", 0.6]] }}
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

export default DemographicDistributionChart;
