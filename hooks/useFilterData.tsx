// src/hooks/useFilteredData.ts
"use client";

import { useFilter } from "@/components/filterform/provider";
import { useState } from "react";

import useSWR from "swr";

interface OccurrenceData {
  occurrence_id: string;
  lat: number;
  lng: number;
  weight?: number;
}

export const useFilteredData = () => {
  const { filters } = { filters: useFilter() };

  //   return useQuery<OccurrenceData[], Error>({
  //     queryKey:['occurrences'], // This is the queryKey
  //     queryFn: async () => {
  //       // Here, you can construct the query string based on the filters
  //       const queryParams = new URLSearchParams(filters as any).toString();
  //       const response = await fetch(
  //         `http://localhost:8001/fogo_cruzado/occurrences/?${queryParams}`,
  //         {
  //           method: 'GET',
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //         }
  //       );

  //       if (!response.ok) {
  //         throw new Error(`Error fetching data: ${response.statusText}`);
  //       }

  //       const data = await response.json();

  //       return data.occurrences as OccurrenceData[];
  //     },

  //same request using swr

  const [loading, setLoading] = useState(false);

  const queryParams = new URLSearchParams(filters as any).toString();
  const data = useSWR(
    `http://localhost:8001/fogo_cruzado/occurrences/?`,
    async (url) => {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }

      const data = await response.json();

      console.log("data1", data);

      return data.occurrences as OccurrenceData[];
    },
    { revalidateOnFocus: false, revalidateOnReconnect: false }
  );

  console.log("data", data);

  return { data: data.data, loading: data.isValidating };
};
