import type { LucideIcon } from "lucide-react";
import { Brain, GitBranch, List, TestTube, Wrench } from "lucide-react";
import { getSectionById } from "./topic-index";

export interface MentorshipTopic {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  slug: string;
  /** Gradient class for card headers */
  gradient: string;
  /** Accent color for links */
  accentColor: string;
}

export const mentorshipLanding = {
  title: "Орчин цагийн програм хангамж хөгжүүлэлт",
  description:
    "AI болон LLM - хэрхэн ажилладаг вэ? CI/CD гэж юу вэ, яагаад хэрэглэдэг вэ? Автоматжуулсан тестийн үр ашиг юу вэ? Ямар ямар түгээмэл ашиглагддаг архитектын шийдлүүд байдаг вэ?",
  path: "/mentorship",
  shareTitle: "Орчин цагийн програм хангамж хөгжүүлэлт",
} as const;

/**
 * Менторлагчийн лекц, дадлагын сэдвүүд.
 * Шинэ сэдвийг энд нэмж, app/mentorship/[slug]/page.tsx дээр хуудас үүсгэнэ.
 */
export const mentorshipTopics: MentorshipTopic[] = [
  {
    title: "Танилцуулга",
    description: "Бүх сэдвийн индекс — нэр ба холбогдох асуудлын товч.",
    href: "/mentorship/intro",
    icon: List,
    slug: "intro",
    gradient: "from-violet-400 via-purple-400 to-fuchsia-500",
    accentColor: "text-violet-600",
  },
  {
    title: getSectionById("mindset-ai-foundation").section,
    description: getSectionById("mindset-ai-foundation").description || "",
    href: `/mentorship/${getSectionById("mindset-ai-foundation").id}`,
    icon: Brain,
    slug: "mindset-ai-foundation",
    gradient: "from-violet-500 via-purple-500 to-fuchsia-600",
    accentColor: "text-violet-600",
  },
  {
    title: getSectionById("developer-tooling-upgrades").section,
    description: getSectionById("developer-tooling-upgrades").description || "",
    href: `/mentorship/${getSectionById("developer-tooling-upgrades").id}`,
    icon: Wrench,
    slug: "developer-tooling-upgrades",
    gradient: "from-sky-500 via-blue-500 to-indigo-600",
    accentColor: "text-sky-600",
  },
  {
    title: getSectionById("testing-culture").section,
    description: getSectionById("testing-culture").description || "",
    href: `/mentorship/${getSectionById("testing-culture").id}`,
    icon: TestTube,
    slug: "testing-culture",
    gradient: "from-amber-500 via-orange-500 to-rose-600",
    accentColor: "text-amber-600",
  },
  {
    title: getSectionById("ci-cd-from-scratch").section,
    description: getSectionById("ci-cd-from-scratch").description || "",
    href: `/mentorship/${getSectionById("ci-cd-from-scratch").id}`,
    icon: GitBranch,
    slug: "ci-cd-from-scratch",
    gradient: "from-emerald-500 via-teal-500 to-cyan-600",
    accentColor: "text-emerald-600",
  },
];

export function getTopicBySlug(slug: string): MentorshipTopic | undefined {
  return mentorshipTopics.find((t) => t.slug === slug);
}
