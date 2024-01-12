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

interface FilterValues {
  startDate: string;
  endDate: string;
  mainReason: string;
}

export const useFilteredData = (
  filters: FilterValues = {
    startDate: "",
    endDate: "",
    mainReason: "",
  }
) => {
  

  const fetcher = async (url: string) => {
    const queryParams = new URLSearchParams(filters as any).toString();

    console.log("filters", filters);
    console.log("queryParams", queryParams);
    const response = await fetch(
      `http://localhost:8001/fogo_cruzado/occurrences/?${queryParams}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();
    return data.occurrences as OccurrenceData[];
  };

  const data = useSWR(
    `http://localhost:8001/fogo_cruzado/occurrences/`,
    fetcher,
    { revalidateOnFocus: false, revalidateOnReconnect: false }
  );

  console.log("data", data);

  return {
    data: data.data,
    loading: data.isValidating,
    error: data.error,
    refetch: data.mutate,
  };
};
