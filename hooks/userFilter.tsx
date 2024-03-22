"use client";
import React, { createContext, useContext, useState } from "react";
import { oneYearAgo, todayDate } from "@/lib/utils";
import useSWR from "swr";
import { OccurrenceData } from "@/app/map/page";
import { APP_API_URL_PROD } from "@/lib/constants";

export interface FilterValues {
  initialdate: string;
  finaldate: string;
  mainReason?: string;
  typeOccurrence?: string;
}

interface FilterContextType {
  filters: FilterValues;
  setFilters: React.Dispatch<React.SetStateAction<FilterValues>>;
  data: OccurrenceData[];
  loading: boolean;
  error: any;
  refetch: () => void;
}

const FilterContext = createContext<FilterContextType | null>(null);

export const useFilter = () => useContext(FilterContext) as FilterContextType;

const fetcher = async (url: string) => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok)
    throw new Error(`Error fetching data: ${response.statusText}`);
  const data = await response.json();
  return data.occurrences as OccurrenceData[];
};

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilters] = useState<FilterValues>({
    initialdate: oneYearAgo(),
    finaldate: todayDate(),
    mainReason: "Todos",
    typeOccurrence: "Completo",
  });

  const verifyFilters = (filters: FilterValues) => {
    let filtersToApply: any = { ...filters };
    if (filtersToApply.mainReason === "Todos") filtersToApply.mainReason = "";
    if (filtersToApply.typeOccurrence === "Completo")
      filtersToApply.typeOccurrence = "";
    return filtersToApply;
  };

  const queryParams = new URLSearchParams(verifyFilters(filters)).toString();

  const {
    data = [],
    error,
    isValidating,
    mutate,
  } = useSWR(`${APP_API_URL_PROD}/occurrences/?${queryParams}`, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return (
    <FilterContext.Provider
      value={{
        filters,
        setFilters,
        data,
        loading: isValidating,
        error,
        refetch: mutate,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}
