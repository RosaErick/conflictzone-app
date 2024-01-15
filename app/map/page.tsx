"use client";
import { FilterProvider } from "@/components/filterform/provider";
import HeatmapContainer from "@/components/heatmap/HeatmapContainer";

export type OccurrenceData = {
  occurrence_id: string;
  lat: number;
  lng: number;
  weight?: number;
  date: string;
  address?: string;
  context_info: {
    mainReason: {
      name: string;
    };
    complementaryReasons: string[];
    clippings: string[];
    massacre: boolean;
    policeUnit: string;
  };
  victims: string[];
  // ... other fields
};

export default function Page() {
  return (
    <FilterProvider>
      <HeatmapContainer />
    </FilterProvider>
  );
}
