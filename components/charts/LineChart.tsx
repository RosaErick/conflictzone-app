import React, { useState } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { OccurrenceData } from '@/app/map/page';

interface AggregatedData {
  [neighborhood: string]: {
    [reason: string]: number;
  };
}

interface LineChartDatum {
  x: string;
  y: number;
}

interface LineChartSeries {
  id: string;
  data: LineChartDatum[];
}

interface LineChartProps {
  data: OccurrenceData[];
}

const aggregateData = (data: OccurrenceData[]): AggregatedData => {
  const aggregatedData: AggregatedData = {};

  data.forEach(({ neighborhood, context_info }) => {
    const reason = context_info.mainReason.name;
    const neighborhoodName = neighborhood.name;

    if (!aggregatedData[neighborhoodName]) aggregatedData[neighborhoodName] = {};
    if (!aggregatedData[neighborhoodName][reason]) aggregatedData[neighborhoodName][reason] = 0;

    aggregatedData[neighborhoodName][reason] += 1;
  });

  return aggregatedData;
};

const getTopNeighborhoods = (aggregatedData: AggregatedData, topN: number): string[] => {
  const neighborhoodCounts: Record<string, number> = {};

  Object.entries(aggregatedData).forEach(([neighborhood, reasons]) => {
    neighborhoodCounts[neighborhood] = Object.values(reasons).reduce((a, b) => a + b, 0);
  });

  return Object.entries(neighborhoodCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, topN)
    .map(([neighborhood]) => neighborhood);
};

const prepareSeries = (aggregatedData: AggregatedData, topNeighborhoods: string[]): LineChartSeries[] => {
  return topNeighborhoods.map(neighborhood => ({
    id: neighborhood,
    data: Object.entries(aggregatedData[neighborhood]).map(([reason, count]) => ({
      x: reason,
      y: count,
    })),
  }));
};

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const [selectedNeighborhoods, setSelectedNeighborhoods] = useState
  (new Set<string>());
  const aggregatedData = aggregateData(data);
  const topNeighborhoods = getTopNeighborhoods(aggregatedData, 10);
  let seriesData = prepareSeries(aggregatedData, topNeighborhoods);

  // If some neighborhoods are selected, filter seriesData to include only those neighborhoods
  if (selectedNeighborhoods.size > 0) {
    seriesData = seriesData.filter((serie) =>
      selectedNeighborhoods.has(serie.id)
    );
  }

  const handleLegendClick = (neighborhood: string) => {
    setSelectedNeighborhoods((prevSelectedNeighborhoods) => {
      const newSelection = new Set(prevSelectedNeighborhoods);
      if (newSelection.has(neighborhood)) {
        newSelection.delete(neighborhood);
      } else {
        newSelection.add(neighborhood);
      }
      return newSelection;
    });
  };

  return (
    <div style={{ height: '50vh' }}>
      <ResponsiveLine
        data={seriesData}
        margin={{ top: 50, right: 160, bottom: 90, left: 80 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -45,

          legendOffset: 80,
          legendPosition: 'middle',
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Count',
          legendOffset: -60,
          legendPosition: 'middle',
        }}
        colors={{ scheme: 'category10' }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabel="y"
        pointLabelYOffset={-12}
        useMesh={true}
        tooltip={({ point }) => {
          return (
            <div
              style={{
                background: 'white',
                padding: '9px 12px',
                border: '1px solid #ccc',
              }}
            >
              <div><strong>{point.serieId}</strong></div>
              <div>{point.data.xFormatted}: {point.data.yFormatted}</div>
            </div>
          );
        }}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            onClick: (datum) => handleLegendClick(datum.id as string),
            justify: false,
            translateX: 140,
            translateY: 0,
            itemsSpacing: 2,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
}

export default LineChart;
