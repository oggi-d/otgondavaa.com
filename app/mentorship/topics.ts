import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Brain,
  GitBranch,
  Layers,
  List,
  TestTube,
  Users,
  Wrench,
} from "lucide-react";
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
  {
    title: getSectionById("software-design-best-practices").section,
    description:
      getSectionById("software-design-best-practices").description || "",
    href: `/mentorship/${getSectionById("software-design-best-practices").id}`,
    icon: Layers,
    slug: "software-design-best-practices",
    gradient: "from-indigo-500 via-blue-500 to-sky-600",
    accentColor: "text-indigo-600",
  },
  {
    title: getSectionById("observability-operations").section,
    description: getSectionById("observability-operations").description || "",
    href: `/mentorship/${getSectionById("observability-operations").id}`,
    icon: Activity,
    slug: "observability-operations",
    gradient: "from-fuchsia-500 via-pink-500 to-rose-600",
    accentColor: "text-fuchsia-600",
  },
  {
    title: getSectionById("team-process").section,
    description: getSectionById("team-process").description || "",
    href: `/mentorship/${getSectionById("team-process").id}`,
    icon: Users,
    slug: "team-process",
    gradient: "from-lime-500 via-lime-600 to-green-700",
    accentColor: "text-lime-700",
  },
  {
    title: getSectionById("legacy-code-modernization").section,
    description: getSectionById("legacy-code-modernization").description || "",
    href: `/mentorship/${getSectionById("legacy-code-modernization").id}`,
    icon: Users,
    slug: "legacy-code-modernization",
    gradient: "from-stone-700 via-neutral-600 to-zinc-500",
    accentColor: "text-zinc-600",
  },
];

export function getTopicBySlug(slug: string): MentorshipTopic | undefined {
  return mentorshipTopics.find((t) => t.slug === slug);
}
