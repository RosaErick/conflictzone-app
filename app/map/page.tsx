"use client";
import { FilterProvider } from "@/components/filterform/provider";
import HeatmapContainer from "@/components/heatmap/HeatmapContainer";

export type OccurrenceData = {
  occurrence_id: string;
  lat: number;
  lng: number;
  weight: number;
  date: string;
  address: string;
  context_info: {
    mainReason: {
      name: string;
      id: string;
    };
    complementaryReasons: [
      {
        name: string;
        id: string;
      }
    ];

    clippings: [
      {
        name: string;
        id: string;
      }
    ];
    massacre: boolean;
    policeUnit: string;
  };
  victims: string[];
  city: {
    name: string;
    id: string;
  };
  neighborhood: {
    name: string;
    id: string;
  };
  // ... other fields
};

export default function Page() {
  return (
    <FilterProvider>
      <HeatmapContainer />
    </FilterProvider>
  );
}
