// src/components/HeatmapWithFilter.tsx
"use client";
import React, { useState } from "react";
import { FilterForm } from "@/components/filterform/FilterForm";

import { useFilter } from "@/components/filterform/provider";
import { useFilteredData } from "@/hooks/useFilterData";
import { ProgressLoadingMap } from "../PogressLoadingMap";
import Heatmap from "./Heatmap";
import { MapConfigCard } from "./MapConfigCard";

const HeatmapContainer = () => {
  const { filters } = useFilter();
  const { data: occurrences, loading, error } = useFilteredData(filters);
  const [showMarkers, setShowMarkers] = useState(false);

  const toggleMarkers = () => {
    setShowMarkers(!showMarkers); // Toggle the state
  };

  console.log("occurrences", occurrences);
  console.log("show markers", showMarkers)

  return (
    <>
      <FilterForm />
      <MapConfigCard
        toggleMarkers={toggleMarkers}
        showMarkers={showMarkers}
      />
      {loading ? (
        <ProgressLoadingMap loading={loading} />
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        <Heatmap data={occurrences || []}
        showMarkers={showMarkers}
        
        />
      )}
    </>
  );
};

export default HeatmapContainer;
