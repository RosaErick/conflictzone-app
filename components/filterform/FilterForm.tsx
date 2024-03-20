// Inside the FilterForm component
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
import { oneYearAgo, todayDate } from "@/lib/utils";

export function FilterForm() {
  const { setFilters, refetch } = useFilter();

  const [localFilters, setLocalFilters] = React.useState({
    initialdate: oneYearAgo(),
    finaldate: todayDate(),
    mainReason: "Todos",
    typeOccurrence: "Completo",
  });

  // Handle form field changes
  const handleChange = (name: any, value: any) => {
    setLocalFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Update the global filters with local filter state then refetch data
    setFilters(localFilters);
  };

  return (
    <Card className="max-w-screen-lg">
      <CardHeader>
        <CardTitle>Filtrar dados</CardTitle>
        <CardDescription>
          Escolha como deseja visualizar os dados
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="initialdate">Data Inicial</Label>
              <Input
                id="initialdate"
                type="date"
                value={localFilters.initialdate}
                onChange={(e) => handleChange("initialdate", e.target.value)}
              />
              <Label htmlFor="finaldate">Data Final</Label>
              <Input
                id="finaldate"
                type="date"
                value={localFilters.finaldate}
                onChange={(e) => handleChange("finaldate", e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5 gap-2">
              <Label htmlFor="mainReason">Motivos</Label>
              <Select
                value={localFilters.mainReason}
                onValueChange={(value) => handleChange("mainReason", value)}
              >
                {/* Select items... */}{" "}
                <SelectTrigger id="mainReason">
                  <SelectValue placeholder="Selecione um motivo" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="Ataque a civis">Ataque a civis</SelectItem>
                  <SelectItem value="Ação policial">Ação policial</SelectItem>
                  <SelectItem value="Operação policial">
                    Operação policial
                  </SelectItem>
                  <SelectItem value="Disputa">Disputa</SelectItem>
                  <SelectItem value="Homicidio/Tentativa">
                    Homicidio/Tentativa
                  </SelectItem>
                  <SelectItem value="Tentativa/Roubo">
                    Tentativa/Roubo
                  </SelectItem>
                  <SelectItem value="Não identificado">
                    Não identificado
                  </SelectItem>
                  <SelectItem value="Todos">Todos</SelectItem>
                </SelectContent>{" "}
              </Select>

              <Label htmlFor="typeOccurrence">Tipo de Ocorrência</Label>
              <Select
                value={localFilters.typeOccurrence}
                onValueChange={(value) => handleChange("typeOccurrence", value)}
              >
                {/* Select items... */}
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
            onClick={() =>
              setLocalFilters({
                initialdate: oneYearAgo(),
                finaldate: todayDate(),
                mainReason: "Todos",
                typeOccurrence: "Completo",
              })
            }
          >
            Cancelar
          </Button>
          <Button type="submit">Filtrar</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
