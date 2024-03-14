import { OccurrenceData } from "@/app/map/page";
import { convertToCSV } from "@/lib/utils";
import React from "react";
import { saveAs } from "file-saver";
import { Button } from "../ui/button";

interface ExportButtonProps {
  occurrenceData: OccurrenceData[];
}

const ExportButton: React.FC<ExportButtonProps> = ({ occurrenceData }) => {
  const handleDownload = (data: OccurrenceData[], filename: string) => {
    const csvData = convertToCSV(data);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, filename);
  };

  return (
    <Button
      onClick={() => handleDownload(occurrenceData, "occurrences.csv")}
      disabled={occurrenceData.length === 0}
    >
      Exportar Dados em CSV
    </Button>
  );
};

export default ExportButton;
