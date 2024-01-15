"use client";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import { OccurrenceData } from "../../app/map/page";
import { formatDate, formatTime } from "@/lib/utils";

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
  const [selectedOccurrence, setSelectedOccurrence] =
    useState<OccurrenceData | null>(null);

  console.log("data on heatmap", data);
  console.log("selectedOccurrence", selectedOccurrence);

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
      {/* HeatmapLayer is controlled by useEffect */}

      {data.map((occurrence, index) => (
        <Marker
          key={index}
          position={{ lat: occurrence.lat, lng: occurrence.lng }}
          onClick={() => setSelectedOccurrence(occurrence)}
          opacity={0} // Invisible marker
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
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-700">
              Detalhes da Ocorrência
            </h2>
            <p className="text-sm text-gray-600">
              Data: {formatDate(selectedOccurrence.date)}
            </p>
            <p className="text-sm text-gray-600">
              Hora: {formatTime(selectedOccurrence.date)}
            </p>
            <p className="text-sm text-gray-600">
              Endereço: {selectedOccurrence.address}
            </p>
            <p className="text-sm text-gray-600">
              Motivo: {selectedOccurrence.context_info.mainReason.name}
            </p>
            <p className="text-sm text-gray-600">
              Vítimas: {selectedOccurrence.victims.length}
            </p>
            {/* Add more details as needed */}
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  ) : (
    <div>Loading...</div>
  );
};

export default React.memo(Heatmap);
