import { LoanCalculator } from "@/components/loan-calculator";
import type { Metadata } from "next";
import { ShareButton } from "@/components/share-button";
import { getCalculatorBySlug } from "../calculators";

const calculator = getCalculatorBySlug("loan");

const title = `${calculator?.title || "Зээлийн тооцоолуур"} - Otgondavaa`;
const description =
  calculator?.description ||
  "Сарын зээлийн төлбөр, нийт хүүг тооцоолж, нэмэлт төлбөр хэрхэн жил хэмнэдгийг хараарай.";
const canonicalPath = "/calculators/loan";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: canonicalPath,
  },
  openGraph: {
    type: "website",
    title,
    description,
    url: canonicalPath,
    images: [
      `/api/og?title=${encodeURIComponent(calculator?.title || "Зээлийн тооцоолуур")}&siteName=otgondavaa.com`,
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [
      `/api/og?title=${encodeURIComponent(calculator?.title || "Зээлийн тооцоолуур")}&siteName=otgondavaa.com`,
    ],
  },
};

export default function LoanCalculatorPage() {
  if (!calculator) return null;

  const Icon = calculator.icon;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://otgondavaa.com";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: calculator.title,
    description: calculator.description,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    url: `${siteUrl}${canonicalPath}`,
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mb-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <h1 className="mb-4 text-4xl font-bold">{calculator.title}</h1>
            <p className="text-lg text-muted-foreground">
              {calculator.description}
            </p>
          </div>
          <ShareButton
            title={calculator.title}
            text={calculator.description}
            path={canonicalPath}
            className="shrink-0"
          />
        </div>
      </div>
      <LoanCalculator />
    </div>
  );
}
