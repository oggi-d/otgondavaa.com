import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getTopicBySlug } from "../topics";
import { topicIndexSections } from "../topic-index";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);
  if (!topic) return { title: "Сэдэв олдсонгүй" };
  return {
    title: `${topic.title} - Менторлагч`,
    description: topic.description,
  };
}

export default async function MentorshipTopicPage({ params }: PageProps) {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);
  if (!topic) notFound();

  if (slug === "intro") {
    return (
      <div className="min-h-screen">
        {/* Subtle gradient bleed from mentorship theme */}
        <div className="relative overflow-hidden bg-linear-to-b from-violet-50/60 via-transparent to-background dark:from-violet-950/20 dark:via-transparent dark:to-background">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />
          <div className="container relative mx-auto px-4 py-8 md:py-12 max-w-4xl">
            <Link
              href="/mentorship"
              className="mb-6 inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              Буцах
            </Link>
            <h1 className="mb-10 text-3xl font-bold tracking-tight md:text-4xl">
              {topic.title}
            </h1>

            <div className="grid gap-6 sm:gap-8">
              {topicIndexSections.map((sec, idx) => (
                <Card
                  key={sec.section}
                  className={cn(
                    "overflow-hidden border-0 shadow-lg bg-card/95 backdrop-blur-sm",
                    "transition-shadow hover:shadow-xl",
                  )}
                >
                  <CardHeader className="pb-3 pt-6 px-6">
                    <div className="flex items-center gap-3">
                      <span
                        className="h-8 w-1 shrink-0 rounded-full bg-linear-to-b from-violet-500 to-fuchsia-500"
                        aria-hidden
                      />
                      <h2 className="text-base font-semibold tracking-tight text-foreground sm:text-lg">
                        {sec.section}
                      </h2>
                    </div>
                  </CardHeader>
                  <CardContent className="px-6 pb-6 pt-0">
                    <ul className="space-y-3">
                      {sec.topics.map((t) => (
                        <li
                          key={t.name}
                          className="flex gap-3 text-sm leading-relaxed"
                        >
                          <span
                            className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400/70 dark:bg-violet-400/50"
                            aria-hidden
                          />
                          <span>
                            <span className="font-medium text-foreground">
                              {t.name}
                            </span>
                            <span className="text-muted-foreground">
                              {" — "}
                              {t.problem}
                            </span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  notFound();
}
