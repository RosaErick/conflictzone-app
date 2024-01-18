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
                id="initialdate"
                type="date"
                placeholder="Data Inicial"
                onChange={(e) => updateFilter("initialdate", e.target.value)}
              />
              <Input
                id="finaldate"
                type="date"
                placeholder="Data Final"
                onChange={(e) => updateFilter("finaldate", e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5 gap-2">
              <Label htmlFor="mainReason">Motivos</Label>
              <Select
                onValueChange={(value) => updateFilter("mainReason", value)}
                
              >
                <SelectTrigger id="mainReason">
                  <SelectValue placeholder="Selecione um motivo" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="Execução">Execução</SelectItem>
                  <SelectItem value="Feminicídio">Feminícidio</SelectItem>
                  <SelectItem value="Ação policial">Ação policial</SelectItem>
                  <SelectItem value="Operação policial">
                    Operação policial
                  </SelectItem>
                  <SelectItem value="Homícidio">Homícidio</SelectItem>
                  <SelectItem value="Todos">Todos</SelectItem>
                </SelectContent>
              </Select>

              <Label htmlFor="typeOccurrence">Tipo de Ocorrência</Label>
              <Select
                onValueChange={(value) => updateFilter("typeOccurrence", value)}
              >
                <SelectTrigger id="typeOccurrence">
                  <SelectValue placeholder="Selecione um tipo" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="withVictim">Com Vítimas</SelectItem>
                  <SelectItem value="withoutVictim">Sem Vítimas</SelectItem>
                  <SelectItem value="Completo">Completo</SelectItem>
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
              updateFilter("initialdate", "");
              updateFilter("finaldate", "");
              updateFilter("mainReason", "");
              updateFilter("typeOccurrence", "");
            }}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={
              !filters.initialdate || !filters.finaldate || !filters.mainReason
            }
          >
            Filtrar
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
