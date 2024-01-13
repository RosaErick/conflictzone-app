"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFilter } from "./provider";
import { useFilteredData } from "@/hooks/useFilterData";

export function FilterForm() {
  const { updateFilter, filters } = useFilter();
  const { refetch } = useFilteredData(filters);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    refetch();
    return;
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Filtre o Mapa de Calor</CardTitle>
        <CardDescription>
          Escolha como deseja visualizar os dados
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="Date">Data</Label>
              <Input
                id="startDate"
                type="date"
                placeholder="Data Inicial"
                onChange={(e) => updateFilter("startDate", e.target.value)}
              />
              <Input
                id="endDate"
                type="date"
                placeholder="Data Final"
                onChange={(e) => updateFilter("endDate", e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="mainReason">Motivos</Label>
              <Select
                onValueChange={(value) => updateFilter("mainReason", value)}
              >
                <SelectTrigger id="mainReason">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="Execução">Execução</SelectItem>
                  <SelectItem value="Feminicídio">Feminícidio</SelectItem>
                  <SelectItem value="Ação policial">Ação policial</SelectItem>
                  <SelectItem value="Operação policial">
                    Operação policial
                  </SelectItem>
                  <SelectItem value="Homícidio">Homícidio</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            type="reset"
            onClick={() => {
              updateFilter("startDate", "");
              updateFilter("endDate", "");
              updateFilter("mainReason", "");
            }}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={
              !filters.startDate && !filters.endDate && !filters.mainReason
            }
          >
            Filtrar
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
