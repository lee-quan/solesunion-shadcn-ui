import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function price2d(value: number | string) {
  return parseFloat(`${value}`).toFixed(2);
}

export function price(value: number | string | undefined) {
  if (value) {
    return parseFloat(`${value}`).toFixed(0);
  }
  return null;
}

export function prettyDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
