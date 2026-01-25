import { SavingsCalculator } from "@/components/savings-calculator";

export const metadata = {
  title: "Хадгаламжийн тооцоолуур - Otgondavaa",
  description: "Тэтгэвэр болон хадгаламжийн зорилгоо төлөвлө. Зорилтот дүнд хүрэхийн тулд сар бүр хэр их хэмнэх хэрэгтэйг хараарай.",
};

export default function SavingsCalculatorPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      <SavingsCalculator />
    </div>
  );
}
