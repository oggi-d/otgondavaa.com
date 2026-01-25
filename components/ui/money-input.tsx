"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface MoneyInputProps extends Omit<
  React.ComponentProps<"input">,
  "type" | "value" | "onChange"
> {
  value: string;
  onChange: (value: string) => void;
}

/**
 * Money input component that formats numbers with commas and displays ₮ symbol
 * Accepts numeric input and formats it as the user types
 */
export function MoneyInput({
  value,
  onChange,
  className,
  ...props
}: MoneyInputProps) {
  // Remove all non-numeric characters for internal storage
  const numericValue = value.replace(/\D/g, "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    // Remove all non-numeric characters
    const cleaned = inputValue.replace(/\D/g, "");
    onChange(cleaned);
  };

  // Format the display value with commas
  const displayValue = numericValue
    ? new Intl.NumberFormat("en-US").format(Number(numericValue))
    : "";

  return (
    <div className="relative">
      <Input
        {...props}
        type="text"
        inputMode="numeric"
        value={displayValue}
        onChange={handleChange}
        className={cn("pr-8", className)}
        placeholder={props.placeholder || "0"}
      />
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
        ₮
      </span>
    </div>
  );
}
