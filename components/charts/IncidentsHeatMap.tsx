import React, { useMemo } from "react";
import { ResponsiveHeatMap } from "@nivo/heatmap";
import { OccurrenceData } from "@/app/map/page";

interface HeatMapDatum {
  x: string;
  y: number;
}

interface HeatMapSerie {
  id: string;
  data: HeatMapDatum[];
}

interface IncidentsHeatMapProps {
  data: OccurrenceData[];
}

const transformDataForHeatMap = (data: OccurrenceData[]): HeatMapSerie[] => {
  const countsByNeighborhoodAndReason: Record<
    string,
    Record<string, number>
  > = {};

  data.forEach((occurrence) => {
    const neighborhoodName = occurrence.neighborhood.name;
    const reasonName = occurrence.context_info.mainReason.name;

    if (!countsByNeighborhoodAndReason[neighborhoodName]) {
      countsByNeighborhoodAndReason[neighborhoodName] = {};
    }
    countsByNeighborhoodAndReason[neighborhoodName][reasonName] =
      (countsByNeighborhoodAndReason[neighborhoodName][reasonName] || 0) + 1;
  });

  // Sort neighborhoods by total occurrences and take the top 10
  const sortedNeighborhoods = Object.entries(countsByNeighborhoodAndReason)
    .sort((a, b) => {
      const totalA = Object.values(a[1]).reduce((sum, count) => sum + count, 0);
      const totalB = Object.values(b[1]).reduce((sum, count) => sum + count, 0);
      return totalB - totalA;
    })
    .slice(0, 10)
    .map(([name]) => name);

  // Filter the data to include only the top 10 neighborhoods
  const filteredData = sortedNeighborhoods.map((neighborhoodName) => ({
    id: neighborhoodName,
    data: Object.entries(countsByNeighborhoodAndReason[neighborhoodName]).map(
      ([reasonName, count]) => ({
        x: reasonName,
        y: count,
      })
    ),
  }));

  return filteredData;
};

const IncidentsHeatMap: React.FC<IncidentsHeatMapProps> = ({ data }) => {
  const heatMapData = useMemo(() => transformDataForHeatMap(data), [data]);

  return (
    <div>
      <h2 className="scroll-m-20 text-1xl font-bold tracking-tight lg:text-1xl mt-10 text-center">
        Ocorrências por bairro e tipo
      </h2>

      <div style={{ height: "500px", marginTop: 20 }}>
        <ResponsiveHeatMap
          data={heatMapData}
          margin={{ top: 60, right: 90, bottom: 60, left: 90 }}
          axisTop={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -90,
            legend: "",
            legendOffset: 46,
          }}
          axisRight={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,

            legendPosition: "middle",
            legendOffset: 70,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,

            legendPosition: "middle",
            legendOffset: -72,
          }}
          animate={true}
          colors={{
            type: "diverging",
            scheme: "red_yellow_blue",
            divergeAt: 0.1,
            minValue: 0,
            maxValue: 100,
          }}
          emptyColor="#555555"
          legends={[
            {
              anchor: "bottom",
              translateX: 0,
              translateY: 30,
              length: 400,
              thickness: 8,
              direction: "row",
              tickPosition: "after",
              tickSize: 3,
              tickSpacing: 4,
              tickOverlap: false,
              tickFormat: ">-.2s",
              title: "Value →",
              titleAlign: "start",
              titleOffset: 4,
            },
          ]}

          // Customize tooltip here
        />
      </div>
    </div>
  );
};

export default IncidentsHeatMap;
