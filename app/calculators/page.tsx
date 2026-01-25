import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, Home, PiggyBank } from "lucide-react";

const calculators = [
  {
    title: "Зээлийн тооцоолуур",
    description: "Сарын зээлийн төлбөр, нийт хүүг тооцоолж, нэмэлт төлбөр хэрхэн жил хэмнэдгийг хараарай.",
    href: "/calculators/mortgage",
    icon: Home,
  },
  {
    title: "Хадгаламжийн тооцоолуур",
    description: "Тэтгэвэр болон хадгаламжийн зорилгоо төлөвлө. Зорилтот дүнд хүрэхийн тулд сар бүр хэр их хэмнэх хэрэгтэйг хараарай.",
    href: "/calculators/savings",
    icon: PiggyBank,
  },
];

export const metadata = {
  title: "Тооцоолуур - Otgondavaa",
  description: "Ирээдүйгээ төлөвлөхөд туслах санхүүгийн тооцоолуур.",
};

export default function CalculatorsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold">Санхүүгийн тооцоолуур</h1>
        <p className="text-lg text-muted-foreground">
          Мэдээлэлтэй санхүүгийн шийдвэр гаргахад туслах хэрэгслүүд.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {calculators.map((calc) => {
          const Icon = calc.icon;
          return (
            <Link key={calc.href} href={calc.href}>
              <Card className="h-full transition-shadow hover:shadow-lg">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{calc.title}</CardTitle>
                  <CardDescription>{calc.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
