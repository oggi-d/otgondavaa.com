import { CalculatorLongTermSavings } from "@/components/calculator-long-term-savings";
import { getCalculatorBySlug } from "../calculators";
import { CalculatorLayout } from "../calculator-layout";
import { getCalculatorMetadata } from "../shared-metadata";

const calculator = getCalculatorBySlug("long-term-savings");
const path = "/calculators/long-term-savings";

export const metadata = getCalculatorMetadata({
  title: `${calculator?.title || "Урт хугацааны хуримтлал"} - Otgondavaa`,
  description:
    calculator?.description ||
    "Нийлмэл хүү (Хүүгээс хүү бодох) хэрхэн ажиллаж, инфляц ба татварын дараах бодит өсөлтийг жилээр харуулна.",
  path,
  ogTitle: calculator?.title,
});

export default function LongTermSavingsCalculatorPage() {
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
      <CalculatorLongTermSavings />
    </CalculatorLayout>
  );
}

