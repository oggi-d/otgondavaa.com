import { SavingsCalculator } from "@/components/savings-calculator";

export const metadata = {
  title: "Savings Calculator - Otgondavaa",
  description: "Plan for retirement and savings goals. See how much you need to save monthly to reach your target.",
};

export default function SavingsCalculatorPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      <SavingsCalculator />
    </div>
  );
}
