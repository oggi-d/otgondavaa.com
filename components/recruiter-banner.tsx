import Link from "next/link";
import { ArrowRight, Briefcase } from "lucide-react";

export function RecruiterBanner() {
  return (
    <Link
      href="/recruiters"
      className="group block border-b border-blue-200 bg-linear-to-r from-blue-600 via-blue-700 to-indigo-700 text-white transition-opacity hover:opacity-95 dark:border-blue-900 dark:from-blue-900 dark:via-blue-950 dark:to-indigo-950"
    >
      <div className="container mx-auto flex min-h-[44px] items-center justify-center gap-3 px-4 py-3 sm:gap-4 sm:py-4">
        <Briefcase
          className="hidden h-5 w-5 shrink-0 sm:block"
          aria-hidden="true"
        />
        <p className="text-center text-sm font-semibold leading-snug sm:text-base">
          <span className="mr-1.5" aria-hidden="true">
            🇺🇸
          </span>
          Hiring in the US? View my résumé &amp; experience in English
        </p>
        <ArrowRight
          className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1"
          aria-hidden="true"
        />
      </div>
    </Link>
  );
}
