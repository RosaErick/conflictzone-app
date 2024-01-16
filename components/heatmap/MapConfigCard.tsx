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
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export function MapConfigCard(
  {
    toggleMarkers,
    showMarkers,
  }: { toggleMarkers: any; showMarkers: boolean } = {
    toggleMarkers: () => {},
    showMarkers: false,
  }
) {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Opções do Mapa</CardTitle>
        <CardDescription>
          Configure as opções do mapa para sua busca
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2">
          <Switch
            id="airplane-mode"
            onCheckedChange={toggleMarkers}
            checked={showMarkers}
          />
          <HoverCard>
            <HoverCardTrigger asChild>
              <Label htmlFor="airplane-mode">Mostrar marcadores</Label>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="flex justify-between space-x-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">Como Usar</h4>
                  <p className="text-sm">
                    Ative os marcadores para visualizar as ocorrências no mapa.
                  </p>
                  <div className="flex items-center pt-2">
                    <span className="text-xs text-muted-foreground">
                      Cada marcador representa uma ocorrência.
                    </span>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between"></CardFooter>
    </Card>
  );
}
