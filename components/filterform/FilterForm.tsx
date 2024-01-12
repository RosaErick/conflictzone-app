'use client'
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

export function FilterForm() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Filtre o Mapa de Calor</CardTitle>
        <CardDescription>
          Escolha como deseja visualizar os dados
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="Date">Data</Label>
              <Input id="name" type="date" placeholder="Data Inicial" />
              <Input id="name" type="date" placeholder="Data Final" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="mainReason">Motivos</Label>
              <Select>
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
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancelar</Button>
        <Button>Filtrar</Button>
      </CardFooter>
    </Card>
  );
}
