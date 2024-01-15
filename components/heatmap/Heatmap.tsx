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
import fireSvg from "../../public/flames-icon.svg";

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

      console.log(
        "data",
        data.map((item) => item.weight)
      );

      const heatmapData = data.map((item) => ({
        location: new google.maps.LatLng(item.lat, item.lng),
        weight: item.weight,
      }));

      new google.maps.visualization.HeatmapLayer({
        data: heatmapData,
        map: map,
        maxIntensity: 300,
        gradient: gradient,
        radius: 12,
      });
    }
  }, [isLoaded, map, data]);

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
      {/* HeatmapLayer is controlled by useEffect */}

      {data.map((occurrence, index) => (
        <Marker
          key={index}
          position={{ lat: occurrence.lat, lng: occurrence.lng }}
          onClick={() => setSelectedOccurrence(occurrence)}
          opacity={0}
          options={{
            icon: {
              url: fireSvg,
              scaledSize: new google.maps.Size(0, 1),
            },
          }}
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
