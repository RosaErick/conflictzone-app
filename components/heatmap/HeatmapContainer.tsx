// src/components/HeatmapWithFilter.tsx
"use client";
import React, { useState } from "react";
import { FilterForm } from "@/components/filterform/FilterForm";
import { useFilter } from "@/components/filterform/provider";
import { ProgressLoadingMap } from "../PogressLoadingMap";
import Heatmap from "./Heatmap";
import { MapConfigCard } from "./MapConfigCard";
import { useMapConfig } from "@/hooks/useMapConfig";
import { RocketIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import SummaryStatisticsPanel from "../SummaryStatisticsPanel";
import { DetailedOccurrenceTable } from "../tables/DetailedOccurenceTable";
import { BarChartCard } from "../BarChartCard";
import { PieChartCard } from "../PieChartCard";
import TrendOverTime from "../charts/TrendOverTime";
import IncidentsByTimeOfDay from "../charts/IncidentsByTimeOfDay";
import IncidentsHeatMap from "../charts/IncidentsHeatMap";
import ExportButton from "../buttons/ExportButton";

const HeatmapContainer = () => {
  const { data: occurrences, loading, error } = useFilter();
  const { mapConfig, updateConfig } = useMapConfig();

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-10">
        <FilterForm />
        <MapConfigCard mapConfig={mapConfig} updateConfig={updateConfig} />
      </div>
      {loading ? (
        <div className="flex flex-col justify-center items-center mt-10 gap-10">
          {" "}
          <Alert className="max-w-[450px] w-full">
            <RocketIcon className="h-4 w-4" />
            <AlertTitle>Carregando Dados!</AlertTitle>
            <AlertDescription>
              Este projeto é um projeto de pesquisa em desenvolvimento.
            </AlertDescription>
          </Alert>
          <ProgressLoadingMap loading={loading} />
        </div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        <div className="flex flex-col items-start justify-between p-5 mt-10">
          <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-3xl">
            Mapa de Calor
          </h1>
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-1 gap-4 w-full">
            <Heatmap data={occurrences || []} mapConfig={mapConfig} />
          </div>
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-1 gap-4 w-full">
            <SummaryStatisticsPanel occurrences={occurrences || []} />
          </div>

          <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-3xl mt-10">
            Gráficos e Tabelas
          </h1>
          <div
            className="col-span-2
          grid grid-cols-1 lg:grid-cols-2 gap-4 w-full
            "
          >
            <BarChartCard data={occurrences || []} />
            <PieChartCard data={occurrences || []} />

            <TrendOverTime data={occurrences || []} />
            <IncidentsByTimeOfDay data={occurrences || []} />
          </div>
          <div className="w-full mt-10">
            <IncidentsHeatMap data={occurrences || []} />
          </div>
          <div className="col-span-2 mt-30">
            <h3 className="font-semibold mb-2 ">Ocorrências Detalhadas</h3>
            <DetailedOccurrenceTable occurrences={occurrences || []} />
          </div>
          <div
            className=" mt-30
                flex justify-end
                w-full
          "
          >
            <ExportButton occurrenceData={occurrences || []} />
          </div>
        </div>
      )}
    </>
  );
};

export default HeatmapContainer;
