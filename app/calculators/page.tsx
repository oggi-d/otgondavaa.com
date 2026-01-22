import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, Home, PiggyBank } from "lucide-react";

const calculators = [
  {
    title: "Mortgage Calculator",
    description: "Calculate your monthly mortgage payments, total interest, and see how extra payments can save you years.",
    href: "/calculators/mortgage",
    icon: Home,
  },
  {
    title: "Savings Calculator",
    description: "Plan for retirement and savings goals. See how much you need to save monthly to reach your target.",
    href: "/calculators/savings",
    icon: PiggyBank,
  },
];

export const metadata = {
  title: "Calculators - Otgondavaa",
  description: "Financial calculators to help you plan your future.",
};

export default function CalculatorsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold">Financial Calculators</h1>
        <p className="text-lg text-muted-foreground">
          Tools to help you make informed financial decisions.
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
