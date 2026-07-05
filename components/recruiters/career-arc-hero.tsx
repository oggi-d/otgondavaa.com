"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { Briefcase, Github, Linkedin, MapPin } from "lucide-react";

/**
 * The career journey, oldest → newest. Coordinates map to the desktop SVG
 * viewBox (0 0 900 340). The path rises left→right to read as an upward
 * trajectory. Recruiters-area copy is English-only by design.
 */
const stops = [
  {
    flag: "🇲🇳",
    year: "2010",
    city: "Ulaanbaatar, Mongolia",
    detail: "B.S. Computer Science",
    x: 110,
    y: 230,
    place: "below" as const,
    delay: 0.75,
  },
  {
    flag: "🎓",
    year: "2017",
    city: "Fairfield, Iowa · USA",
    detail: "M.S. Computer Science",
    x: 450,
    y: 170,
    place: "above" as const,
    delay: 1.5,
  },
  {
    flag: "🌉",
    year: "Today",
    city: "San Francisco Bay Area",
    detail: "Staff Engineer · GoFundMe",
    x: 790,
    y: 110,
    place: "above" as const,
    delay: 2.15,
  },
];

const ARC_PATH = "M 110 230 C 260 220, 330 185, 450 170 S 650 130, 790 110";
const LABEL_W = 220;
const LABEL_H = 96;

function StopLabel({ stop }: { stop: (typeof stops)[number] }) {
  return (
    <div
      className="arc-pop-item flex h-full items-start justify-center"
      style={{ animationDelay: `${stop.delay}s` }}
    >
      <div className="w-fit max-w-full rounded-xl border border-border/60 bg-background/70 px-3 py-2 text-center shadow-sm backdrop-blur-sm">
        <div className="flex items-center justify-center gap-1.5">
          <span className="text-base leading-none">{stop.flag}</span>
          <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-sm font-bold text-transparent dark:from-blue-400 dark:to-indigo-400">
            {stop.year}
          </span>
        </div>
        <div className="mt-1 text-xs font-semibold text-foreground">
          {stop.city}
        </div>
        <div className="text-[11px] leading-tight text-muted-foreground">
          {stop.detail}
        </div>
      </div>
    </div>
  );
}

export function CareerArcHero() {
  return (
    <section className="relative overflow-hidden border-b border-border/60 bg-linear-to-b from-blue-50 via-slate-50/60 to-background dark:from-blue-950/40 dark:via-slate-950/30 dark:to-background">
      {/* Ambient background: masked grid + slow-floating blobs */}
      <div className="pointer-events-none absolute inset-0 arc-grid" aria-hidden />
      <div
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue-400/25 blur-3xl arc-blob dark:bg-blue-500/10"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-0 top-8 h-80 w-80 rounded-full bg-indigo-400/25 blur-3xl arc-blob dark:bg-indigo-500/10"
        style={{ animationDelay: "-6s" }}
        aria-hidden
      />

      <div className="container relative mx-auto px-4 py-14 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="arc-up mb-5">
            For US recruiters &amp; hiring managers
          </Badge>

          {/* Avatar with slowly rotating gradient ring */}
          <div className="arc-scale relative mx-auto mb-6 h-32 w-32 md:h-36 md:w-36">
            <div
              className="arc-spin absolute -inset-1.5 rounded-full opacity-80 blur-[2px]"
              style={{
                background:
                  "conic-gradient(from 0deg, #3b82f6, #6366f1, #38bdf8, #3b82f6)",
              }}
              aria-hidden
            />
            <Avatar className="relative h-full w-full border-4 border-background shadow-xl">
              <AvatarImage
                src="/images/avatar.jpg"
                alt="Otgondavaa Dashnyam (Oggi)"
              />
              <AvatarFallback>OD</AvatarFallback>
            </Avatar>
          </div>

          <h1
            className="arc-up text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
            style={{ animationDelay: "0.05s" }}
          >
            Otgondavaa Dashnyam{" "}
            <span className="text-muted-foreground">(Oggi)</span>
          </h1>
          <p
            className="arc-up mt-2 text-lg text-muted-foreground sm:text-xl"
            style={{ animationDelay: "0.12s" }}
          >
            Staff Software Engineer
          </p>

          <div
            className="arc-up mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-muted-foreground"
            style={{ animationDelay: "0.18s" }}
          >
            <span className="inline-flex items-center gap-1.5">
              <Briefcase className="h-4 w-4" aria-hidden="true" />
              GoFundMe
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              Burlingame, California, USA
            </span>
          </div>

          {/* Live availability signal */}
          <div
            className="arc-up mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400"
            style={{ animationDelay: "0.24s" }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 motion-safe:animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Open to US opportunities
          </div>

          <p
            className="arc-up mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            style={{ animationDelay: "0.3s" }}
          >
            Full-stack software engineer with 16+ years of experience building
            payments, banking, and consumer platforms. Currently Staff Engineer
            at GoFundMe in the San Francisco Bay Area.
          </p>

          <div
            className="arc-up mt-8 flex flex-wrap justify-center gap-3"
            style={{ animationDelay: "0.36s" }}
          >
            <ButtonLink
              href="https://www.linkedin.com/in/oggi/"
              variant="secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="h-4 w-4" aria-hidden="true" />
              LinkedIn profile
            </ButtonLink>
            <ButtonLink
              href="https://github.com/oggi-d"
              variant="outline"
              target="_blank"
              rel="noopener noreferrer"
              className="dark:border-input dark:bg-input/30 dark:hover:bg-input/50"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              GitHub
            </ButtonLink>
          </div>
        </div>

        {/* ------------------------------------------------------------ */}
        {/* The career arc — the centerpiece                             */}
        {/* ------------------------------------------------------------ */}
        <div className="mx-auto mt-14 max-w-3xl">
          <p
            className="arc-fade text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground"
            style={{ animationDelay: "0.5s" }}
          >
            From Ulaanbaatar to the Bay Area
          </p>

          {/* Desktop / tablet: animated SVG arc */}
          <div className="mt-4 hidden md:block">
            <svg
              viewBox="0 0 900 340"
              className="h-auto w-full overflow-visible"
              role="img"
              aria-label="Career journey from Ulaanbaatar, Mongolia (2010) to Fairfield, Iowa (2017) to the San Francisco Bay Area today."
            >
              <defs>
                <linearGradient id="arcGrad" x1="0" y1="1" x2="1" y2="0">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="55%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#38bdf8" />
                </linearGradient>
                <filter
                  id="arcGlow"
                  x="-60%"
                  y="-60%"
                  width="220%"
                  height="220%"
                >
                  <feGaussianBlur stdDeviation="4" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* faint full track */}
              <path
                d={ARC_PATH}
                fill="none"
                strokeWidth={3}
                strokeLinecap="round"
                className="text-blue-500/15 dark:text-white/10"
                stroke="currentColor"
              />

              {/* animated drawn line */}
              <path
                d={ARC_PATH}
                fill="none"
                stroke="url(#arcGrad)"
                strokeWidth={3.5}
                strokeLinecap="round"
                pathLength={1}
                className="arc-path-draw"
                style={{ animationDelay: "0.55s" }}
              />

              {/* leading comet */}
              <circle
                r={5}
                fill="url(#arcGrad)"
                filter="url(#arcGlow)"
                className="arc-comet"
                style={{
                  offsetPath: `path('${ARC_PATH}')`,
                  animationDelay: "0.55s",
                }}
              />

              {/* stop markers + labels */}
              {stops.map((stop) => (
                <g key={stop.city}>
                  <g transform={`translate(${stop.x} ${stop.y})`}>
                    <circle
                      r={16}
                      className="text-blue-500/10 dark:text-blue-400/10"
                      fill="currentColor"
                    />
                    <circle
                      r={9}
                      fill="none"
                      stroke="url(#arcGrad)"
                      strokeWidth={2}
                      className="arc-ping"
                      style={{ animationDelay: `${stop.delay + 0.2}s` }}
                    />
                    <g
                      className="arc-pop-item"
                      style={{ animationDelay: `${stop.delay}s` }}
                    >
                      <circle
                        r={8.5}
                        className="fill-background"
                        stroke="url(#arcGrad)"
                        strokeWidth={2.5}
                      />
                      <circle r={3.5} fill="url(#arcGrad)" />
                    </g>
                  </g>
                  <foreignObject
                    x={stop.x - LABEL_W / 2}
                    y={
                      stop.place === "above"
                        ? stop.y - 16 - LABEL_H
                        : stop.y + 16
                    }
                    width={LABEL_W}
                    height={LABEL_H}
                    className="overflow-visible"
                  >
                    <StopLabel stop={stop} />
                  </foreignObject>
                </g>
              ))}
            </svg>
          </div>

          {/* Mobile: vertical timeline */}
          <ol className="relative mx-auto mt-6 max-w-sm space-y-6 pl-10 md:hidden">
            <span
              className="absolute bottom-2 left-4 top-2 w-px bg-border"
              aria-hidden
            />
            <span
              className="absolute bottom-2 left-4 top-2 w-px origin-top bg-linear-to-b from-blue-500 to-indigo-500 arc-line-grow"
              style={{ animationDelay: "0.4s" }}
              aria-hidden
            />
            <span
              className="absolute left-3 h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_10px_2px] shadow-blue-500/50 arc-comet-y"
              style={{ animationDelay: "0.4s" }}
              aria-hidden
            />
            {stops.map((stop, i) => (
              <li
                key={stop.city}
                className="arc-mobile-item relative"
                style={{ animationDelay: `${0.55 + i * 0.4}s` }}
              >
                <span className="absolute -left-[26px] top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-blue-500 bg-background">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                </span>
                <div className="rounded-xl border border-border/60 bg-background/70 px-4 py-3 shadow-sm backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-base leading-none">{stop.flag}</span>
                    <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-sm font-bold text-transparent dark:from-blue-400 dark:to-indigo-400">
                      {stop.year}
                    </span>
                  </div>
                  <div className="mt-1 text-sm font-semibold text-foreground">
                    {stop.city}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {stop.detail}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
