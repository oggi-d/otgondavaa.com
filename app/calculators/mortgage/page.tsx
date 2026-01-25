import { MortgageCalculator } from "@/components/mortgage-calculator";

export const metadata = {
  title: "Зээлийн тооцоолуур - Otgondavaa",
  description: "Сарын зээлийн төлбөр, нийт хүүг тооцоолж, нэмэлт төлбөр хэрхэн жил хэмнэдгийг хараарай.",
};

export default function MortgageCalculatorPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      <MortgageCalculator />
    </div>
  );
}
