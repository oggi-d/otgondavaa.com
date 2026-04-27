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
 * Formats a number as short Mongolian Tugrik (e.g., 10.5сая, 8.9 т.б, 500мян)
 * - Billions (тэрбум): "т.б" suffix when ≥ 1_000_000_000 (e.g., 8_984_100_000 → "8.9 т.б")
 * - Millions: "сая" suffix (e.g., 10,500,000 → "10.5сая")
 * - Thousands: "мян" suffix (e.g., 500,000 → "500мян")
 * - Below 1000: Full format with ₮
 */
export function formatShortMNT(value: number): string {
  const abs = Math.abs(value);
  const sign = value < 0 ? "-" : "";
  if (abs >= 1_000_000_000) {
    const ter = abs / 1_000_000_000;
    const truncated = Math.floor(ter * 10) / 10;
    return `${sign}${truncated} т.б`;
  }
  if (abs >= 1_000_000) {
    return `${sign}${(abs / 1_000_000).toFixed(1)}сая`;
  }
  if (abs >= 1000) {
    return `${sign}${(abs / 1000).toFixed(0)}мян`;
  }
  return formatMNT(value);
}
