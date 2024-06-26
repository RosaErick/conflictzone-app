"use client";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import React, { useEffect, useRef, useState } from "react";
import { OccurrenceData } from "../../app/map/page";
import { formatDate, formatTime } from "@/lib/utils";
import HeatmapInfoWindowContent from "../modals/HeatmapInfoWindowContent";
import { Skeleton } from "../ui/skeleton";

type HeatmapProps = {
  data: OccurrenceData[];
  mapConfig: {
    radius: number;
    opacity: number;
    maxIntensity: number;
    showMarkers: boolean;
  };
};

const containerStyle = {
  width: "100%",
  height: "60vh",
};

const center = {
  lat: -22.8232803345,
  lng: -43.345500946,
};
const gradient = [
  "rgba(0, 255, 255, 0)",
  "rgba(0, 255, 255, 1)",
  "rgba(0, 191, 255, 1)",
  "rgba(0, 127, 255, 1)",
  "rgba(0, 63, 255, 1)",
  "rgba(0, 0, 255, 1)",
  "rgba(0, 0, 223, 1)",
  "rgba(0, 0, 191, 1)",
  "rgba(0, 0, 159, 1)",
  "rgba(0, 0, 127, 1)",
  "rgba(63, 0, 91, 1)",
  "rgba(127, 0, 63, 1)",
  "rgba(191, 0, 31, 1)",
  "rgba(255, 0, 0, 1)",
];

const Heatmap: React.FC<HeatmapProps> = ({ data, mapConfig }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAOmvdZjOuquyQPBOaoS_yopHCe7BpYtJk",
    libraries: ["visualization"],
  });
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedOccurrence, setSelectedOccurrence] =
    useState<OccurrenceData | null>(null);
  const heatmapRef = useRef<google.maps.visualization.HeatmapLayer | null>(
    null
  );
  console.log("data on heatmap", data);
  console.log("selectedOccurrence", selectedOccurrence);
  console.log("mapConfig on heatmapcomponent", mapConfig);

  useEffect(() => {
    if (isLoaded && map) {
      const heatmapData = data.map((item) => ({
        location: new google.maps.LatLng(item.lat, item.lng),
        weight: item.weight,
      }));

      if (!heatmapRef.current) {
        heatmapRef.current = new google.maps.visualization.HeatmapLayer({
          data: heatmapData,
          map: map,
          // gradient: gradient,
          radius: mapConfig.radius,
          dissipating: true,
          opacity: mapConfig.opacity,
          maxIntensity: mapConfig.maxIntensity,
        });
      } else {
        heatmapRef.current.setOptions({
          data: heatmapData,
          maxIntensity: mapConfig.maxIntensity,
          //gradient: gradient,
          radius: mapConfig.radius,
          dissipating: true,
          opacity: mapConfig.opacity,
        });
      }
    }
  }, [isLoaded, map, data, mapConfig]);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      options={{
        mapTypeId: google.maps.MapTypeId.HYBRID,
      }}
      center={center}
      zoom={11.2}
      onLoad={(mapInstance) => setMap(mapInstance)}
      onUnmount={() => setMap(null)}
    >
      {data.map((occurrence, index) => (
        <Marker
          key={index}
          position={{ lat: occurrence.lat, lng: occurrence.lng }}
          onClick={() => setSelectedOccurrence(occurrence)}
          opacity={mapConfig.showMarkers ? 1 : 0}
        />
      ))}

      {selectedOccurrence && (
        <InfoWindow
          position={{
            lat: selectedOccurrence.lat,
            lng: selectedOccurrence.lng,
          }}
          onCloseClick={() => setSelectedOccurrence(null)}
        >
          <HeatmapInfoWindowContent occurrence={selectedOccurrence} />
        </InfoWindow>
      )}
    </GoogleMap>
  ) : (
    <div className="flex flex-col space-y-3">
      <Skeleton className="rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
};

export default React.memo(Heatmap);
