import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getTopicBySlug } from "./topics";
import type { IndexSection } from "./topic-index";

interface MentorshipContentLayoutProps {
  title: string;
  /** Sections with groups (main topics) and their sub-topics. */
  sections: IndexSection[];
  /** Intro: only main topic names. Detail: main topics + nested sub-topics. */
  variant?: "intro" | "detail";
  children?: React.ReactNode;
}

/**
 * Shared layout for mentorship intro and slug pages: back link, title,
 * topic index (intro = main topics only, detail = full nested list), then page content.
 */
export function MentorshipContentLayout({
  title,
  sections,
  variant = "detail",
  children,
}: MentorshipContentLayoutProps) {
  const isIntro = variant === "intro";

  return (
    <div className="min-h-screen">
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
            {title}
          </h1>

          <div className="grid gap-6 sm:gap-8">
            {sections.map((sec) => {
              const sectionHref = isIntro
                ? (getTopicBySlug(sec.id) ? `/mentorship/${sec.id}` : "#")
                : null;
              return (
              <Card
                key={sec.id}
                className={cn(
                  "overflow-hidden border-0 shadow-lg bg-card/95 backdrop-blur-sm",
                  "transition-shadow hover:shadow-xl",
                )}
              >
                <CardHeader className="pb-3 pt-6 px-6">
                  <div className="flex items-start gap-3">
                    <span
                      className="w-1 shrink-0 self-stretch rounded-full bg-linear-to-b from-violet-500 to-fuchsia-500"
                      aria-hidden
                    />
                    <div className="min-w-0">
                      <h2
                        className="scroll-mt-24 text-base font-semibold tracking-tight text-foreground sm:text-lg"
                        id={`${sec.id}-title`}
                      >
                        {sectionHref != null ? (
                          <Link
                            href={sectionHref}
                            className="hover:underline focus:underline focus:outline-none"
                          >
                            {sec.section}
                          </Link>
                        ) : (
                          sec.section
                        )}
                      </h2>
                      {sec.description ? (
                        <p
                          className="mt-1 text-sm text-muted-foreground"
                          id={`${sec.id}-desc`}
                        >
                          {sec.description}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="px-6 pb-6 pt-0">
                  {isIntro ? (
                    <ul className="space-y-3">
                      {sec.groups.map((g) => {
                        const groupHref = sectionHref === "#" ? "#" : sectionHref ? `${sectionHref}#${g.id}-title` : null;
                        return (
                        <li
                          key={g.id}
                          className="flex gap-3 text-sm leading-relaxed"
                          aria-labelledby={groupHref ? undefined : `${g.id}-title`}
                          aria-describedby={g.problem && !groupHref ? `${g.id}-desc` : undefined}
                        >
                          <span
                            className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400/70 dark:bg-violet-400/50"
                            aria-hidden
                          />
                          <span>
                            {groupHref != null ? (
                              <Link
                                href={groupHref}
                                className="font-medium text-foreground hover:underline focus:underline focus:outline-none"
                              >
                                <span
                                  id={groupHref !== "#" ? `${g.id}-title` : undefined}
                                  className={groupHref !== "#" ? "scroll-mt-24" : undefined}
                                >
                                  {g.name}
                                </span>
                              </Link>
                            ) : (
                              <span className="font-medium text-foreground">
                                <span id={`${g.id}-title`} className="scroll-mt-24">
                                  {g.name}
                                </span>
                              </span>
                            )}
                            {g.problem ? (
                              <span className="text-muted-foreground" id={`${g.id}-desc`}>
                                {" — "}
                                {g.problem}
                              </span>
                            ) : null}
                          </span>
                        </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <div className="space-y-6">
                      {sec.groups.map((g) => (
                        <div key={g.id} className="space-y-3">
                          <div className="flex gap-2 items-start">
                            <ChevronRight
                              className="mt-0.5 h-4 w-4 shrink-0 text-violet-500 dark:text-violet-400"
                              aria-hidden
                            />
                            <div>
                              <span className="font-semibold text-foreground text-sm">
                                <span id={`${g.id}-title`} className="scroll-mt-24">
                                  {g.name}
                                </span>
                              </span>
                              {g.problem ? (
                                <span className="text-muted-foreground text-sm">
                                  {" — "}
                                  <span id={`${g.id}-desc`}>{g.problem}</span>
                                </span>
                              ) : null}
                            </div>
                          </div>
                          <ul className="ml-6 space-y-2 border-l border-violet-200/60 dark:border-violet-800/50 pl-4">
                            {g.topics.map((t) => (
                              <li
                                key={t.name}
                                className="flex gap-2 text-sm leading-relaxed"
                              >
                                <span
                                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400/50 dark:bg-violet-400/40"
                                  aria-hidden
                                />
                                <span>
                                  <span className="font-medium text-foreground/90">
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
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
              );
            })}
          </div>

          {children ? (
            <div className="mt-10 space-y-8">{children}</div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
