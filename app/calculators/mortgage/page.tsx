import { MortgageCalculator } from "@/components/mortgage-calculator";

export const metadata = {
  title: "Mortgage Calculator - Otgondavaa",
  description: "Calculate your monthly mortgage payments, total interest, and see how extra payments can save you years.",
};

export default function MortgageCalculatorPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      <MortgageCalculator />
    </div>
  );
}
