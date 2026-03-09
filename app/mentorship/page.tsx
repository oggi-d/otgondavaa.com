import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { mentorshipTopics } from "./topics";
import { ShareButton } from "@/components/share-button";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.otgondavaa.com";

const title = "Орчин цагийн програм хангамж хөгжүүлэлт - Сургалтын материалууд";
const description =
  "Орчин цагийн програм хангамж хөгжүүлэлт сургалтын хүрээнд ашигладаг лекц, слайд болон дадлагын материалууд.";
const path = "/mentorship";

export const metadata = {
  title: `${title} - Otgondavaa`,
  description,
  alternates: { canonical: path },
  openGraph: {
    title,
    description,
    url: path,
    images: [
      `${siteUrl}/api/og?title=${encodeURIComponent("Орчин цагийн програм хангамж хөгжүүлэлт - Сургалтын материалууд")}&siteName=otgondavaa.com`,
    ],
  },
};

export default function MentorshipPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative overflow-hidden bg-linear-to-b from-violet-50 via-purple-50/50 to-background dark:from-violet-950/30 dark:via-purple-950/20 dark:to-background">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Орчин цагийн програм хангамж хөгжүүлэлт
            </h1>
            <p className="mt-4 text-lg text-muted-foreground md:text-xl">
              Лекц болон дадлагын сэдвүүд. Слайд, материал энд цуглуулсан тул
              дараа нь ашиглахад тохиромжтой.
            </p>
            <div className="mt-6 flex justify-center">
              <ShareButton
                title="Менторлагч - Лекц ба дадлага"
                text={description}
                path={path}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Topics list or empty state */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        {mentorshipTopics.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
            {mentorshipTopics.map((topic) => {
              const Icon = topic.icon;
              return (
                <Link key={topic.href} href={topic.href} className="group">
                  <div className="h-full overflow-hidden rounded-2xl bg-card shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    <div
                      className={cn(
                        "relative h-32 bg-linear-to-r p-6",
                        topic.gradient,
                      )}
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-foreground">
                        {topic.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                        {topic.description}
                      </p>
                      <div
                        className={cn(
                          "mt-4 inline-flex items-center gap-1 text-sm font-semibold transition-colors",
                          topic.accentColor,
                        )}
                      >
                        Сэдвийг үзэх
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="mx-auto max-w-md rounded-2xl border border-dashed border-muted-foreground/30 bg-muted/30 px-6 py-12 text-center">
            <p className="text-muted-foreground">
              Сэдвүүдийг{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-medium">
                app/mentorship/topics.ts
              </code>{" "}
              файлд нэмж, энд картууд автоматаар гарна.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
