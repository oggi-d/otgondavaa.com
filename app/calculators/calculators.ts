import { PiggyBank, LucideIcon, CoinsIcon, Sparkles } from "lucide-react";

export interface Calculator {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  slug: string;
  /** Gradient class for card headers */
  gradient: string;
  /** Icon background color class (colored bg for icon) */
  iconBg: string;
  /** Accent color for links and highlights */
  accentColor: string;
}

export const calculators: Calculator[] = [
  {
    title: "Зээлийн тооцоолуур",
    description:
      "Сарын зээлийн төлбөр, нийт хүүг тооцоолж, нэмэлт төлбөр хэрхэн хэмнэдгийг хараарай.",
    href: "/calculators/loan",
    icon: CoinsIcon,
    slug: "loan",
    gradient: "from-blue-400 via-cyan-400 to-cyan-500",
    iconBg: "bg-blue-500",
    accentColor: "text-blue-600",
  },
  {
    title: "Хадгаламжийн тооцоолуур",
    description:
      "Хадгаламжаа зөв төлөвлө. Зорилтот дүндээ хүрэхийн тулд хэр их хуримтлуулах хэрэгтэйг хараарай.",
    href: "/calculators/savings",
    icon: PiggyBank,
    slug: "savings",
    gradient: "from-emerald-400 via-green-400 to-teal-500",
    iconBg: "bg-emerald-500",
    accentColor: "text-emerald-600",
  },
  {
    title: "Урт хугацааны хуримтлал",
    description:
      "Нийлмэл хүү (Хүүгээс хүү бодох)-ийн нөлөөг жишээлэн, инфляц ба татварыг тооцсон үлдэгдлийг жилээр харуулна.",
    href: "/calculators/long-term-savings",
    icon: Sparkles,
    slug: "long-term-savings",
    gradient: "from-violet-400 via-fuchsia-400 to-pink-500",
    iconBg: "bg-violet-500",
    accentColor: "text-violet-600",
  },
];

export function getCalculatorBySlug(slug: string): Calculator | undefined {
  return calculators.find((calc) => calc.slug === slug);
}
