// src/components/SummaryStatisticsPanel.tsx
"use client";
import React from "react";
import { OccurrenceData } from "../app/map/page";
import { formatDate } from "@/lib/utils";
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
        <p>Total de Ocorrências: {occurrences.length}</p>
        <p>Filtros Aplicados:</p>
        <ul>
          <li>Data Inicial: {filters.initialdate}</li>
          <li>Data Final: {filters.finaldate}</li>
          <li>Motivo: {filters.mainReason}</li>
          <li>Tipo de Ocorrência: {filters.typeOccurrence}</li>
        </ul>
        <div className="mt-4 ">
          <h3 className="font-semibold mb-2 ">Incidentes Recentes</h3>
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
