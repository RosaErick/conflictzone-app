import React from "react";
import { formatDate } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableRow,
  TableHeader,
} from "@/components/ui/table";
import { OccurrenceData } from "@/app/map/page";

interface SummaryStaticsTableProps {
  data: OccurrenceData[];
}

export function SummaryStaticsTable({ data }: SummaryStaticsTableProps) {
  return (
    <Table>
      <TableCaption>Estatísticas Resumidas sobre os Dados</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Data</TableHead>
          <TableHead>Local</TableHead>
          <TableHead>Motivo</TableHead>
          <TableHead>Vítimas</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((incident, index) => (
          <TableRow key={index}>
            <TableCell>{formatDate(incident.date)}</TableCell>
            <TableCell>{incident.address}</TableCell>
            <TableCell>{incident.context_info.mainReason.name}</TableCell>
            <TableCell>{incident.victims.length}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
