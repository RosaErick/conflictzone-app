"use client";
import { FilterForm } from "@/components/filterform/FilterForm";
import Heatmap from "../../components/Heatmap";
import { FilterProvider } from "@/components/filterform/provider";
import { useFilteredData } from "@/hooks/useFilterData";
import { Progress } from "@/components/ui/progress";
import { ProgressLoadingMap } from "@/components/PogressLoadingMap";

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
  const { data: occurrences, loading } = useFilteredData();

  console.log(occurrences);

  return (
    <>
      <FilterProvider>
        <FilterForm />
        {loading ? (
          <ProgressLoadingMap loading={loading} />
        ) : (
          <Heatmap data={occurrences || []} />
        )}
      </FilterProvider>
    </>
  );
}
