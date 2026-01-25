import { LoanCalculator } from "@/components/loan-calculator";
import { getCalculatorBySlug } from "../calculators";
import { CalculatorLayout } from "../calculator-layout";
import { getCalculatorMetadata } from "../shared-metadata";

const calculator = getCalculatorBySlug("loan");
const path = "/calculators/loan";

export const metadata = getCalculatorMetadata({
  title: `${calculator?.title || "Зээлийн тооцоолуур"} - Otgondavaa`,
  description:
    calculator?.description ||
    "Сарын зээлийн төлбөр, нийт хүүг тооцоолж, нэмэлт төлбөр хэрхэн жил хэмнэдгийг хараарай.",
  path,
  ogTitle: calculator?.title,
});

export default function LoanCalculatorPage() {
  if (!calculator) return null;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://otgondavaa.com";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: calculator.title,
    description: calculator.description,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    url: `${siteUrl}${path}`,
  };

  return (
    <CalculatorLayout
      title={calculator.title}
      description={calculator.description}
      path={path}
      jsonLd={jsonLd}
      icon={calculator.icon}
      gradient={calculator.gradient}
      iconBg={calculator.iconBg}
    >
      <LoanCalculator />
    </CalculatorLayout>
  );
}
