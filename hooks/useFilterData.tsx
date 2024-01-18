// src/hooks/useFilteredData.ts
"use client";
import { OccurrenceData } from "@/app/map/page";
import { FilterValues } from "@/components/filterform/provider";
import useSWR from "swr";

export const useFilteredData = (filters: FilterValues) => {
  function verifyFilters(filters: FilterValues) {
    let filtersToApply = filters;

    if (filters.mainReason === "Todos") {
      filtersToApply = { ...filtersToApply, mainReason: "" };
    }

    if (filters.typeOccurrence === "Completo") {
      filtersToApply = { ...filtersToApply, typeOccurrence: "" };
    }

    return filtersToApply;
  }

  const fetcher = async (url: string) => {
    const queryParams = new URLSearchParams(
      verifyFilters(filters) as any
    ).toString();

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
