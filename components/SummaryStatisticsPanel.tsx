// src/components/SummaryStatisticsPanel.tsx
"use client";
import React from "react";
import { OccurrenceData } from "../app/map/page";
import {  formatDateDisplay } from "@/lib/utils";
import PieChart from "./charts/PieChart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SummaryStaticsTable } from "./tables/SummaryStaticsTable";
import { useFilter } from "./filterform/provider";

interface SummaryStatisticsProps {
  occurrences: OccurrenceData[];
}

interface OccurrenceTypeCount {
  [key: string]: number;
}

const SummaryStatisticsPanel: React.FC<SummaryStatisticsProps> = ({
  occurrences,
}) => {
  const { filters } = useFilter();

  function getRecentIncidents(
    occurrences: OccurrenceData[],
    numIncidents: number = 10
  ): OccurrenceData[] {
    return occurrences
      .slice()
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, numIncidents);
  }

  const recentIncidents = getRecentIncidents(occurrences);

  // Prepare data for the pie chart
  const occurrenceTypes = occurrences.reduce<OccurrenceTypeCount>(
    (acc, occurrence) => {
      const type = occurrence.context_info.mainReason.name;
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    },
    {}
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Estatísticas Resumidas</CardTitle>
        <CardDescription>
          Veja estatísticas resumidas sobre os dados
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="my-0 p-4 border border-gray-200 rounded-md">
          <h4 className="font-semibold mb-2">Filtros Aplicados:</h4>

          <p>Total de ocorrências encontradas: {occurrences.length}</p>
          <span className="font-semibold">
            {formatDateDisplay(filters.initialdate)} ~{" "}
            {formatDateDisplay(filters.finaldate)}
          </span>
          <ul className="list-disc list-inside">
            <li>Motivo: {filters.mainReason || "Todos"}</li>
            <li>Tipo de Ocorrência: {filters.typeOccurrence || "Completo"}</li>
          </ul>
        </div>
        <div className="mt-4 ">
          <h3 className="font-semibold mb-2 "> 10 Incidentes mais recentes</h3>
          <div className="max-h-[300px] overflow-x-auto">
            <SummaryStaticsTable data={recentIncidents} />
          </div>
        </div>
        <div className="mt-4">
          <PieChart data={occurrenceTypes} />
        </div>
      </CardContent>
    </Card>
  );
};

export default SummaryStatisticsPanel;
