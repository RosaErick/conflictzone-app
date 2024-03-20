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
import DemographicDistributionChart from "../charts/DemographicDistributionChart";
import { Collapsible } from "@radix-ui/react-collapsible";
import { CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

const HeatmapContainer = () => {
  const { data: occurrences, loading, error } = useFilter();
  const { mapConfig, updateConfig } = useMapConfig();

  return (
    <>
      <div
        className="grid grid-cols-1 lg:grid-cols-1 mt-10        
      "
      >
        <FilterForm />
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
        <div className="flex flex-col items-start justify-between p-5 mt-10 ">
          <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-3xl">
            Mapa de Calor
          </h1>
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-1 gap-4 w-full bg-background">
            <Dialog>
              <DialogTrigger>
                <Button variant="outline">Configurações do Mapa</Button>
              </DialogTrigger>
              <DialogContent>
          
                <MapConfigCard
                  mapConfig={mapConfig}
                  updateConfig={updateConfig}
                />
              </DialogContent>
            </Dialog>
            <Heatmap data={occurrences || []} mapConfig={mapConfig} />
          </div>
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-1 gap-4 w-full">
            <SummaryStatisticsPanel occurrences={occurrences || []} />
          </div>

          <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-3xl mt-10">
            Gráficos e Tabelas
          </h1>
          <section
            className="col-span-2
          grid grid-cols-1 lg:grid-cols-2 gap-4 w-full
            "
          >
            <BarChartCard data={occurrences || []} />
            <PieChartCard data={occurrences || []} />

            <TrendOverTime data={occurrences || []} />
            <IncidentsByTimeOfDay data={occurrences || []} />
          </section>

          <Collapsible className="mt-20 w-full">
            <CollapsibleTrigger>
              <h2
                className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-2xl mb-4
              flex justify-between items-center gap-5"
              >
                Análise das Vítimas{" "}
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.85355 2.14645C3.65829 1.95118 3.34171 1.95118 3.14645 2.14645C2.95118 2.34171 2.95118 2.65829 3.14645 2.85355L7.14645 6.85355C7.34171 7.04882 7.65829 7.04882 7.85355 6.85355L11.8536 2.85355C12.0488 2.65829 12.0488 2.34171 11.8536 2.14645C11.6583 1.95118 11.3417 1.95118 11.1464 2.14645L7.5 5.79289L3.85355 2.14645ZM3.85355 8.14645C3.65829 7.95118 3.34171 7.95118 3.14645 8.14645C2.95118 8.34171 2.95118 8.65829 3.14645 8.85355L7.14645 12.8536C7.34171 13.0488 7.65829 13.0488 7.85355 12.8536L11.8536 8.85355C12.0488 8.65829 12.0488 8.34171 11.8536 8.14645C11.6583 7.95118 11.3417 7.95118 11.1464 8.14645L7.5 11.7929L3.85355 8.14645Z"
                    fill="currentColor"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </h2>
            </CollapsibleTrigger>
            <CollapsibleContent className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <DemographicDistributionChart
                data={occurrences || []}
                title="Distribuição por Idade"
              />

              <DemographicDistributionChart
                data={occurrences || []}
                title="Distribuição por Gênero"
              />
              <DemographicDistributionChart
                data={occurrences || []}
                title="Distribuição por Raça"
              />
            </CollapsibleContent>
          </Collapsible>

          <div className="w-full mt-10">
            <IncidentsHeatMap data={occurrences || []} />
          </div>

          <h3 className="font-semibold mb-2 ">Ocorrências Detalhadas</h3>
          <DetailedOccurrenceTable occurrences={occurrences || []} />

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
