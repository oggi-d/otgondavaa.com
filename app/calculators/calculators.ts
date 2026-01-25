import {
  Home,
  PiggyBank,
  LucideIcon,
  DollarSign,
  CoinsIcon,
} from "lucide-react";

export interface Calculator {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  slug: string;
}

export const calculators: Calculator[] = [
  {
    title: "Зээлийн тооцоолуур",
    description:
      "Сарын зээлийн төлбөр, нийт хүүг тооцоолж, нэмэлт төлбөр хэрхэн хэмнэдгийг хараарай.",
    href: "/calculators/loan",
    icon: CoinsIcon,
    slug: "loan",
  },
  {
    title: "Хадгаламжийн тооцоолуур",
    description:
      "Тэтгэвэр болон хадгаламжийн зорилгоо төлөвлө. Зорилтот дүнд хүрэхийн тулд сар бүр хэр их хэмнэх хэрэгтэйг хараарай.",
    href: "/calculators/savings",
    icon: PiggyBank,
    slug: "savings",
  },
];

export function getCalculatorBySlug(slug: string): Calculator | undefined {
  return calculators.find((calc) => calc.slug === slug);
}
