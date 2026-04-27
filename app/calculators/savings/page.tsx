import { CalculatorSavings } from "@/components/calculator-savings";
import { getCalculatorBySlug } from "../calculators";
import { CalculatorLayout } from "../calculator-layout";
import { getCalculatorMetadata } from "../shared-metadata";

const calculator = getCalculatorBySlug("savings");
const path = "/calculators/savings";

export const metadata = getCalculatorMetadata({
  title: `${calculator?.title || "Хадгаламжийн тооцоолуур"} - Otgondavaa`,
  description:
    calculator?.description ||
    "Зорилтот дүнд хүрэхийн тулд сар бүр хэр их хэмнэх хэрэгтэйг хараарай.",
  path,
  ogTitle: calculator?.title,
});

export default function SavingsCalculatorPage() {
  if (!calculator) return null;

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.otgondavaa.com";
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
      <CalculatorSavings />
    </CalculatorLayout>
  );
}
