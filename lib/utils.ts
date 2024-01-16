import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', options);
}

export function formatTime(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' };
  const date = new Date(dateString);
  return date.toLocaleTimeString('pt-BR', options);
}


export function CustomConfigDebounce<F extends (...args: any[]) => void>(func: F, waitFor: number): (...args: Parameters<F>) => void {
  let timeoutId: number | undefined;

  return function(...args: Parameters<F>) {
    clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => func(...args), waitFor);
  };
}