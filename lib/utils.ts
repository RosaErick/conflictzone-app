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
  // Helper function to handle flattening including arrays and nested objects
  const flatten = (data: any, prefix = ''): Record<string, any> => {
    const result: Record<string, any> = {};
    for (const [key, value] of Object.entries(data)) {
      const pre = prefix.length ? prefix + '.' : '';
      if (typeof value === 'object' && value !== null && !(value instanceof Date)) {
        if (Array.isArray(value)) {
          if (key === 'victims') {
            // Flatten each victim object and concatenate the 'circumstances', 'qualifications' arrays, etc.
            result[key] = value.map((victim: any) => {
              const victimInfo = flatten(victim);
              // Concatenate nested array values into strings
              victimInfo.circumstances = victim.circumstances.map((c: any) => c.name).join(';');
              victimInfo.qualifications = victim.qualifications.map((q: any) => q.name).join(';');
              // Other arrays can be handled similarly
              return victimInfo;
            }).join('|'); // Separate each victim with a pipe character
          } else {
            // Other arrays can be simply counted
            result[key] = value.length;
          }
        } else {
          Object.assign(result, flatten(value, pre + key));
        }
      } else {
        result[pre + key] = value;
      }
    }
    return result;
  };

  // Flatten each object in the array
  const flatArray = arr.map(item => flatten(item));

  // Extract headers
  const headers = Object.keys(flatArray[0]);

  // Map each object to a CSV string
  const csvRows = flatArray.map(row =>
    headers.map(fieldName => {
      // For the victims field, we ensure it is a string and escape any necessary characters
      if (fieldName === 'victims' && typeof row[fieldName] === 'string') {
        return `"${row[fieldName].replace(/"/g, '""')}"`;
      }

      const fieldValue = row[fieldName];
      if (fieldValue === null || fieldValue === undefined) {
        return '';
      }

      return `"${String(fieldValue).replace(/"/g, '""')}"`;
    }).join(',')
  );

  return [headers.join(','), ...csvRows].join('\n');
}
