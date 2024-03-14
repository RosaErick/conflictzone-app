import { OccurrenceData } from "@/app/map/page";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR", options);
}

export function formatTime(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
  };
  const date = new Date(dateString);
  return date.toLocaleTimeString("pt-BR", options);
}

export function CustomConfigDebounce<F extends (...args: any[]) => void>(
  func: F,
  waitFor: number
): (...args: Parameters<F>) => void {
  let timeoutId: number | undefined;

  return function (...args: Parameters<F>) {
    clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => func(...args), waitFor);
  };
}

export const oneYearAgo = (): string => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 1);

  // Adjust for the timezone offset
  const offset = date.getTimezoneOffset();
  date.setMinutes(date.getMinutes() - offset);

  return date.toISOString().split("T")[0]; // Returns date in YYYY-MM-DD format
};

export const todayDate = (): string => {
  const date = new Date();

  // Adjust for the timezone offset
  const offset = date.getTimezoneOffset();
  date.setMinutes(date.getMinutes() - offset);

  return date.toISOString().split("T")[0];
};

export const formatDateDisplay = (dateStr: string): string => {
  if (!dateStr) return "";

  const [year, month, day] = dateStr.split("-").map((num) => parseInt(num, 10));

  const date = new Date(year, month - 1, day);

  const formattedDay = date.getDate().toString().padStart(2, "0");
  const formattedMonth = (date.getMonth() + 1).toString().padStart(2, "0");
  const formattedYear = date.getFullYear();

  return `${formattedDay}/${formattedMonth}/${formattedYear}`;
};

export function convertToCSV(arr: OccurrenceData[]): string {
  const array = [Object.keys(arr[0])].concat(arr as any);

  return array
    .map((it) => {
      return Object.values(it).toString();
    })
    .join("\n");
}


