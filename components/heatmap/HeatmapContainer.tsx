// src/components/HeatmapWithFilter.tsx
"use client";
import React from "react";
import { FilterForm } from "@/components/filterform/FilterForm";

import { useFilter } from "@/components/filterform/provider";
import { useFilteredData } from "@/hooks/useFilterData";
import { ProgressLoadingMap } from "../PogressLoadingMap";
import Heatmap from "./Heatmap";

export type OccurrenceData = {
  occurrence_id: string;
  lat: number;
  lng: number;
  weight?: number;
};

const HeatmapContainer = () => {
  const { filters } = useFilter();
  const { data: occurrences, loading, error } = useFilteredData(filters);

  return (
    <>
      <FilterForm />
      {loading ? (
        <ProgressLoadingMap loading={loading} />
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        <Heatmap data={occurrences || []} />
      )}
    </>
  );
};

export default HeatmapContainer;
