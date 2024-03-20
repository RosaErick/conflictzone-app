// src/hooks/useMapConfig.ts
import { useState } from "react";

interface MapConfig {
  radius: number;
  opacity: number;
  maxIntensity: number;
  showMarkers: boolean;
}

const defaultConfig: MapConfig = {
  radius: 12,
  opacity: 1,
  maxIntensity: 500,
  showMarkers: false,
};

export const useMapConfig = () => {
  const [mapConfig, setMapConfig] = useState<MapConfig>(defaultConfig);

  const updateConfig = (newConfig: Partial<MapConfig>) => {
    setMapConfig((prevConfig) => ({ ...prevConfig, ...newConfig }));
  };

  return { mapConfig, updateConfig };
};
