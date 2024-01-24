// src/components/HeatmapWithFilter.tsx
"use client";
import React, { useState } from "react";
import { FilterForm } from "@/components/filterform/FilterForm";
import { useFilter } from "@/components/filterform/provider";
import { useFilteredData } from "@/hooks/useFilterData";
import { ProgressLoadingMap } from "../PogressLoadingMap";
import Heatmap from "./Heatmap";
import { MapConfigCard } from "./MapConfigCard";
import { useMapConfig } from "@/hooks/useMapConfig";
import { RocketIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import SummaryStatisticsPanel from "../SummaryStatisticsPanel";
import { DetailedOccurrenceTable } from "../tables/DetailedOccurenceTable";
import BarChart from "../charts/BarChart";
import { BarChartCard } from "../BarChartCard";
import { PieChartCard } from "../PieChartCard";

const HeatmapContainer = () => {
  const { filters } = useFilter();
  const { data: occurrences, loading, error } = useFilteredData(filters);
  const { mapConfig, updateConfig } = useMapConfig();

  return (
    <>
      <div className="flex justify-center p-5 gap-4 flex-wrap">
        <FilterForm />
        <MapConfigCard mapConfig={mapConfig} updateConfig={updateConfig} />
      </div>
      {loading ? (
        <div className="flex flex-col justify-center items-center mt-10 gap-10">
          {" "}
          <Alert className="max-w-[450px] w-full">
            <RocketIcon className="h-4 w-4" />
            <AlertTitle>Carregando o mapa!</AlertTitle>
            <AlertDescription>
              Este projeto é um projeto de pesquisa em desenvolvimento.
            </AlertDescription>
          </Alert>
          <ProgressLoadingMap loading={loading} />
        </div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Heatmap data={occurrences || []} mapConfig={mapConfig} />

          <div>
            <SummaryStatisticsPanel occurrences={occurrences || []} />
          </div>
          <div
            className="col-span-2
          grid grid-cols-1 lg:grid-cols-2 gap-4
            "
          >
            <BarChartCard data={occurrences || []} />
            <PieChartCard data={occurrences || []} />
          </div>

          <div className="col-span-2">
            <h3 className="font-semibold mb-2 ">Ocorrências Detalhadas</h3>
            <DetailedOccurrenceTable occurrences={occurrences || []} />
          </div>
        </div>
      )}
    </>
  );
};

export default HeatmapContainer;
