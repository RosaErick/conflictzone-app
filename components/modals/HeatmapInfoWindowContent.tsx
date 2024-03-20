import React from "react";
import { formatDate, formatTime } from "@/lib/utils";
import HeatmapVictimContent from "./HeatmapVictimDetailsContent";

const HeatmapInfoWindowContent = ({ occurrence }: any) => (
  <div className="p-4 bg-white rounded-lg shadow">
    <div className="flex flex-col gap-2 mb-4">
      <h2 className="text-xl font-semibold text-gray-800">
        Detalhes da Ocorrência
      </h2>
      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
        <p>Data: {formatDate(occurrence.date)}</p>
        <p>Hora: {formatTime(occurrence.date)}</p>
        <p>Endereço: {occurrence.address}</p>
        <p>Motivo: {occurrence.context_info?.mainReason.name}</p>
        <p>Vítimas: {occurrence.victims.length}</p>
      </div>
    </div>

    <HeatmapVictimContent victims={occurrence.victims} />
  </div>
);

export default HeatmapInfoWindowContent;
