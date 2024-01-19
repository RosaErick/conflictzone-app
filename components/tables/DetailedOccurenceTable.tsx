"use client";

import * as React from "react";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OccurrenceData } from "@/app/map/page";
import { formatDateDisplay } from "@/lib/utils";
import { useState } from "react";

interface DetailedOccurrenceTableProps {
  occurrences: OccurrenceData[];
}

export const columns: ColumnDef<OccurrenceData>[] = [
  {
    accessorKey: "date",
    id: "data",
    header: "Data",
    cell: ({ getValue }) => formatDateDisplay(getValue() as string),
  },
  {
    id: "cidade",
    header: "Cidade",
    accessorKey: "city.name",
  },
  {
    id: "bairro",
    header: "Bairro",
    accessorKey: "neighborhood.name",
  },
  {
    accessorKey: "address",
    id: "local",
    header: "Local",
  },
  {
    accessorKey: "context_info.mainReason.name",
    header: "Motivo",
    id: "motivo",
  },
  {
    accessorKey: "agent_presence",
    header: "Presença de Agente",
    id: "Presença de Agente",
  },
  {
    accessorKey: "police_action",
    header: "Ação Policial",
    id: "Ação Policial",
  },

  {
    id: "vitimas",
    header: "Vítimas",
    accessorFn: (row) => row.victims.length,
    cell: ({ getValue }) => getValue() + " victim(s)",
  },
  {
    id: "Unidade Policial",
    header: "Unidade Policial",
    accessorFn: (row) => row.context_info.policeUnit,
  },
  {
    id: "motivos Complementares",
    header: "Motivos Complementares",
    accessorFn: (row) =>
      row.context_info.complementaryReasons
        .map((reason) => reason.name)
        .join(", "),
  },
  {
    id: "clippings",
    header: "Recortes",
    accessorFn: (row) =>
      row.context_info.clippings.map((clipping) => clipping.name).join(", "),
  },
  {
    id: "massacre",
    header: "Massacre",
    accessorFn: (row) => row.context_info.massacre,
  },

  // Add more columns as needed
];

export function DetailedOccurrenceTable({
  occurrences,
}: DetailedOccurrenceTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data: occurrences,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filtre as ocorrências por cidade, bairro e local..."
          value={(table.getColumn("local")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("local")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Colunas <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Sem resultados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} colunas selecionadas.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Próxima
          </Button>
        </div>
      </div>
    </div>
  );
}
