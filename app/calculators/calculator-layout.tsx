import { ReactNode } from "react";
import { LucideIcon, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ShareButton } from "@/components/share-button";
import { cn } from "@/lib/utils";

interface CalculatorLayoutProps {
  title: string;
  description: string;
  path: string;
  jsonLd: Record<string, unknown>;
  children: ReactNode;
  maxWidth?: string;
  centered?: boolean;
  icon?: LucideIcon;
  gradient?: string;
  iconBg?: string;
}

export function CalculatorLayout({
  title,
  description,
  path,
  jsonLd,
  children,
  maxWidth = "max-w-6xl",
  icon: Icon,
  gradient = "from-blue-400 via-cyan-400 to-cyan-500",
  iconBg = "bg-blue-500",
}: CalculatorLayoutProps) {
  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Header with Gradient Background */}
      <div className="relative overflow-hidden bg-linear-to-b from-blue-50 via-cyan-50/50 to-background dark:from-blue-950/30 dark:via-cyan-950/20 dark:to-background">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
        <div className="container mx-auto px-4 py-8 md:py-12">
          {/* Back Link */}
          <Link
            href="/calculators"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Бүх тооцоолуур руу буцах
          </Link>

          {/* Centered Header Content */}
          <div className="mx-auto max-w-2xl text-center">
            {/* Icon with Gradient Background */}
            {Icon && (
              <div className="mb-6 flex justify-center">
                <div
                  className={cn(
                    "flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-r shadow-lg",
                    gradient,
                  )}
                >
                  <Icon className="h-8 w-8 text-white" />
                </div>
              </div>
            )}

            <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              {title}
            </h1>
            <p className="mt-4 text-base text-muted-foreground md:text-lg">
              {description}
            </p>

            <div className="mt-6 flex justify-center">
              <ShareButton title={title} text={description} path={path} />
            </div>
          </div>
        </div>
      </div>

      {/* Calculator Content */}
      <div className={cn("container mx-auto px-4 py-8 md:py-12", maxWidth)}>
        {children}
      </div>
    </div>
  );
}
