"use client";

import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import { OccurrenceData } from "../map/page";

type LatLngWeight = any;

type HeatmapProps = {
  data: OccurrenceData[];
};

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const center = {
  lat: -22.8232803345,
  lng: -43.345500946,
};

const Heatmap: React.FC<HeatmapProps> = ({ data }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAOmvdZjOuquyQPBOaoS_yopHCe7BpYtJk",
    libraries: ["visualization"],
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    if (isLoaded && map) {
      // Convert the data to the format expected by the HeatmapLayer

      console.log("data", data);
      const heatmapData = data.map((item) => ({
        location: new google.maps.LatLng(item.lat, item.lng),
        weight: item.weight || 1,
      }));

      new google.maps.visualization.HeatmapLayer({
        data: heatmapData,
        map: map,
      });
    }
  }, [isLoaded, map, data]);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={(mapInstance) => setMap(mapInstance)}
      onUnmount={() => setMap(null)}
    >
      {/* HeatmapLayer is now controlled by useEffect */}
    </GoogleMap>
  ) : (
    <div>Loading...</div>
  );
};

export default React.memo(Heatmap);
