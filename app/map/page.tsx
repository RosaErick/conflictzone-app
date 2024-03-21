"use client";

import HeatmapContainer from "@/components/heatmap/HeatmapContainer";
import { FilterProvider } from "@/hooks/userFilter";

export type IDNamePair = {
  id: string;
  name: string;
};

export type VictimDetails = {
  id: string;
  occurrenceId: string;
  type: string; // "People" in examples
  situation: string; // "Wounded" in examples
  circumstances: IDNamePair[];
  deathDate: string | null;
  personType: string; // "Civilian" in examples
  age: number | null;
  ageGroup: IDNamePair;
  genre: IDNamePair; // Consider renaming to gender for clarity
  race: string;
  place: IDNamePair;
  serviceStatus: IDNamePair;
  qualifications: IDNamePair[];
  politicalPosition: IDNamePair;
  politicalStatus: IDNamePair;
  partie: string | null;
  coorporation: IDNamePair;
  agentPosition: IDNamePair;
  agentStatus: IDNamePair;
  unit: string;
};

export type ContextInfo = {
  mainReason: IDNamePair;
  complementaryReasons: IDNamePair[];
  clippings: IDNamePair[];
  massacre: boolean;
  policeUnit: string;
};

export type OccurrenceData = {
  occurrence_id: string;
  lat: number;
  lng: number;
  weight: number;
  date: string;
  address: string;
  context_info: ContextInfo;
  victims: VictimDetails[];
  city: IDNamePair;
  neighborhood: IDNamePair;
};

export default function Page() {
  return (
    <FilterProvider>
      <HeatmapContainer />
    </FilterProvider>
  );
}
