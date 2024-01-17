import * as React from "react";
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
import { Input } from "@/components/ui/input";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface MapConfigProps {
  mapConfig: {
    radius: number;
    opacity: number;
    maxIntensity: number;
    showMarkers: boolean;
  };
  updateConfig: (newConfig: Partial<MapConfigProps["mapConfig"]>) => void;
}

export function MapConfigCard({ mapConfig, updateConfig }: MapConfigProps) {
  const handleToggleMarkers = () => {
    updateConfig({ showMarkers: !mapConfig.showMarkers });
  };

  const handleRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    updateConfig({ radius: +e.target.value });

  const handleOpacityChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    updateConfig({ opacity: +e.target.value });

  const handleMaxIntensityChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    updateConfig({ maxIntensity: +e.target.value });

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Opções do Mapa</CardTitle>
        <CardDescription>
          Configure as opções do mapa para sua busca
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <HoverCard>
              <HoverCardTrigger asChild>
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="radius"
                    className="cursor-pointer font-semibold"
                  >
                    Raio:
                  </Label>

                  <p className="text-sm px-1">{mapConfig.radius}</p>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 p-2">
                <p className="text-sm">
                  Ajuste o raio do efeito de calor no mapa.
                </p>
              </HoverCardContent>
            </HoverCard>
            <Input
              type="range"
              min="0"
              max="50"
              value={mapConfig.radius}
              onChange={handleRadiusChange}
            />
          </div>

          <div className="flex items-center justify-between">
            <HoverCard>
              <HoverCardTrigger asChild>
                <Label htmlFor="opacity" className="cursor-pointer">
                  Opacidade: {mapConfig.opacity.toFixed(2)}
                </Label>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 p-2">
                <p className="text-sm">
                  Ajuste a opacidade dos marcadores no mapa.
                </p>
              </HoverCardContent>
            </HoverCard>
            <Input
              type="range"
              min="0"
              max="1.00"
              step="0.01"
              value={mapConfig.opacity}
              onChange={handleOpacityChange}
            />
          </div>

          <div className="flex items-center justify-between">
            <HoverCard>
              <HoverCardTrigger asChild>
                <Label htmlFor="maxIntensity" className="cursor-pointer">
                  Intensidade Máxima: {mapConfig.maxIntensity}
                </Label>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 p-2">
                <p className="text-sm">
                  Controla a intensidade máxima do efeito de calor no mapa.
                </p>
              </HoverCardContent>
            </HoverCard>
            <Input
              type="range"
              min="0"
              max="1000"
              step="5"
              value={mapConfig.maxIntensity}
              onChange={handleMaxIntensityChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <HoverCard>
              <HoverCardTrigger asChild>
                <Label htmlFor="showMarkers" className="cursor-pointer">
                  Mostrar Marcadores
                </Label>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 p-2">
                <p className="text-sm">
                  Ative para exibir marcadores individuais de ocorrências no
                  mapa.
                </p>
              </HoverCardContent>
            </HoverCard>
            <Switch
              id="showMarkers"
              checked={mapConfig.showMarkers}
              onCheckedChange={handleToggleMarkers}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between"></CardFooter>
    </Card>
  );
}
