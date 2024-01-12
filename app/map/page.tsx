"use client";
import { FilterProvider } from "@/components/filterform/provider";
import HeatmapContainer from "@/components/heatmap/HeatmapContainer";

export type OccurrenceData = {
  occurrence_id: string;
  lat: number;
  lng: number;
  weight?: number;
  // ... other fields
};

type HeatmapProps = {
  data: OccurrenceData[];
};

async function getData(): Promise<OccurrenceData[]> {
  try {
    const response = await fetch(
      "http://localhost:8001/fogo_cruzado/occurrences/",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("response", response);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
    const { occurrences } = await response.json();
    return occurrences || [];
  } catch (error) {
    console.error("Failed to load heatmap data:", error);
    return [];
  }
}

export default function Page() {
  return (
    <FilterProvider>
      <HeatmapContainer />
    </FilterProvider>
  );
}
