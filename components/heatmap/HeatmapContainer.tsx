// src/components/HeatmapWithFilter.tsx
"use client";
import React from "react";
import Heatmap from "./Heatmap";
import TrendOverTime from "../charts/TrendOverTime";
import IncidentsByTimeOfDay from "../charts/IncidentsByTimeOfDay";
import IncidentsHeatMap from "../charts/IncidentsHeatMap";
import ExportButton from "../buttons/ExportButton";
import SummaryStatisticsPanel from "../SummaryStatisticsPanel";
import DemographicDistributionChart from "../charts/DemographicDistributionChart";
import { FilterForm } from "@/components/filterform/FilterForm";
import { useFilter } from "@/components/filterform/provider";
import { ProgressLoadingMap } from "../PogressLoadingMap";
import { MapConfigCard } from "./MapConfigCard";
import { useMapConfig } from "@/hooks/useMapConfig";
import { RocketIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { DetailedOccurrenceTable } from "../tables/DetailedOccurenceTable";
import { BarChartCard } from "../BarChartCard";
import { PieChartCard } from "../PieChartCard";
import { Collapsible } from "@radix-ui/react-collapsible";
import { CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

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
          <div className="mt-2 grid grid-cols-1 lg:grid-cols-1 gap-4 w-full">
            <Dialog>
              <DialogTrigger className="flex justify-end w-full">
                <Button variant="outline">Configurações do Mapa</Button>
              </DialogTrigger>
              <DialogContent className="bg-background">
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
          <Collapsible className="w-full mt-10 mb-10">
            <CollapsibleTrigger>
              <h1 className="mb-5 flex justify-start items-center gap-5 scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-3xl">
                Ocorrências
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
              </h1>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4"
              >
                <BarChartCard data={occurrences || []} />
                <PieChartCard data={occurrences || []} />
                <TrendOverTime data={occurrences || []} />
                {/* <IncidentsByTimeOfDay data={occurrences || []} /> */}
                <IncidentsHeatMap data={occurrences || []} />
              </motion.div>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible className="w-full mt-10">
            <CollapsibleTrigger>
              <h1
                className="    mb-5
                flex justify-start items-center gap-5 scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-3xl"
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
              </h1>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-10"
              >
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
                  title="Distribuição por Cor"
                />
              </motion.div>
            </CollapsibleContent>
          </Collapsible>
          <h2 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-3xl mt-20">
            Ocorrências Detalhadas
          </h2>
          <DetailedOccurrenceTable occurrences={occurrences || []} />
          <div
            className=" mt-30
                flex justify-end
                w-full"
          >
            <ExportButton occurrenceData={occurrences || []} />
          </div>
        </div>
      )}
    </>
  );
};

export default HeatmapContainer;
