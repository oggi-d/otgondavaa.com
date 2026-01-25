import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a number as Mongolian Tugrik currency (1,000,000₮)
 */
export function formatMNT(amount: number): string {
  return (
    new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount) + "₮"
  );
}

/**
 * Formats a number as short Mongolian Tugrik (e.g., 10.5сая, 500мян)
 * - Millions: "сая" suffix (e.g., 10,500,000 → "10.5сая")
 * - Thousands: "мян" suffix (e.g., 500,000 → "500мян")
 * - Below 1000: Full format with ₮
 */
export function formatShortMNT(value: number): string {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}сая`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(0)}мян`;
  }
  return formatMNT(value);
}
