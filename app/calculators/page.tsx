import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { calculators } from "./calculators";
import { getCalculatorMetadata } from "./shared-metadata";
import { ShareButton } from "@/components/share-button";

const title = "Санхүүгийн тооцоолуур - Otgondavaa";
const description = "Таны хувийн санхүүг төлөвлөхөд туслах тооцоолуур.";
const path = "/calculators";

export const metadata = getCalculatorMetadata({
  title,
  description,
  path,
  ogTitle: "Санхүүгийн тооцоолуур",
});

export default function CalculatorsPage() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.otgondavaa.com";
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
    <div className="min-h-screen">
      {/* Hero Section with Gradient Background */}
      <div className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-cyan-50/50 to-background dark:from-blue-950/30 dark:via-cyan-950/20 dark:to-background">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
        <div className="container mx-auto px-4 py-16 md:py-24">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Санхүүгийн тооцоолуур
            </h1>
            <p className="mt-4 text-lg text-muted-foreground md:text-xl">
              Мэдээлэлтэй санхүүгийн шийдвэр гаргахад туслах хэрэгслүүд.
            </p>
            <div className="mt-6 flex justify-center">
              <ShareButton
                title="Санхүүгийн тооцоолуур"
                text={description}
                path={path}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Calculator Cards Grid */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {calculators.map((calc) => {
            const Icon = calc.icon;
            return (
              <Link key={calc.href} href={calc.href} className="group">
                <div className="h-full overflow-hidden rounded-2xl bg-card shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  {/* Gradient Header */}
                  <div
                    className={cn(
                      "relative h-32 bg-gradient-to-r p-6",
                      calc.gradient,
                    )}
                  >
                    {/* Icon with white background */}
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-foreground">
                      {calc.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {calc.description}
                    </p>
                    <div
                      className={cn(
                        "mt-4 inline-flex items-center gap-1 text-sm font-semibold transition-colors",
                        calc.accentColor,
                      )}
                    >
                      Тооцоолуур ашиглах
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
