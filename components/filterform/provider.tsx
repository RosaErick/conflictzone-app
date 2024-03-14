"use client";
import { oneYearAgo, todayDate } from "@/lib/utils";
import React, { createContext, useContext, useState } from "react";

export interface FilterValues {
  initialdate: string;
  finaldate: string;
  mainReason?: string;
  typeOccurrence?: string;
}

interface FilterContextType {
  filters: FilterValues;
  updateFilter: (name: keyof FilterValues, value: string) => void;
}

const FilterContext = createContext<FilterContextType | null>(null);

export const useFilter = () => useContext(FilterContext) as FilterContextType;

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilters] = useState<FilterValues>({
    initialdate: oneYearAgo(),
    finaldate: todayDate(),
    mainReason: "Todos",
    typeOccurrence: "Completo",
  });

  const updateFilter = (name: keyof FilterValues, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };


  console.log("filters in update ", filters)

  return (
    <FilterContext.Provider value={{ filters, updateFilter }}>
      {children}
    </FilterContext.Provider>
  );
}
