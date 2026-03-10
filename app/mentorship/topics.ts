import type { LucideIcon } from "lucide-react";
import { Brain, List } from "lucide-react";

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
    title: "Mindset & AI Foundation",
    description:
      "Сэтгэлзүй, AI-ийн үндэс, SDD, RAG, fine-tuning болон жишээ төсөл.",
    href: "/mentorship/mindset-ai-foundation",
    icon: Brain,
    slug: "mindset-ai-foundation",
    gradient: "from-violet-500 via-purple-500 to-fuchsia-600",
    accentColor: "text-violet-600",
  },
];

export function getTopicBySlug(slug: string): MentorshipTopic | undefined {
  return mentorshipTopics.find((t) => t.slug === slug);
}
