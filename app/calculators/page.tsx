import Link from "next/link";
import type { Metadata } from "next";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShareButton } from "@/components/share-button";
import { calculators } from "./calculators";

const title = "Санхүүгийн тооцоолуур - Otgondavaa";
const description = "Таны хувийн санхүүг төлөвлөхөд туслах тооцоолуур.";
const canonicalPath = "/calculators";

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
      `/api/og?title=${encodeURIComponent("Санхүүгийн тооцоолуур")}&siteName=otgondavaa.com`,
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [
      `/api/og?title=${encodeURIComponent("Санхүүгийн тооцоолуур")}&siteName=otgondavaa.com`,
    ],
  },
};

export default function CalculatorsPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://otgondavaa.com";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Санхүүгийн тооцоолуур",
    description,
    itemListElement: calculators.map((calc, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: calc.title,
      url: `${siteUrl}${calc.href}`,
    })),
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mb-12">
        <div className="flex flex-col gap-4 text-center sm:flex-row sm:items-start sm:justify-between sm:text-left">
          <div className="min-w-0">
            <h1 className="mb-4 text-4xl font-bold">Санхүүгийн тооцоолуур</h1>
            <p className="text-lg text-muted-foreground">
              Мэдээлэлтэй санхүүгийн шийдвэр гаргахад туслах хэрэгслүүд.
            </p>
          </div>
          <ShareButton
            title={title}
            text={description}
            path={canonicalPath}
            className="shrink-0"
          />
        </div>
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
