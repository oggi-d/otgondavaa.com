import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import type { ComponentProps } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { getTopicBySlug } from "../topics";
import { topicIndexSections } from "../topic-index";
import { MentorshipContentLayout } from "../mentorship-content-layout";
import { getMentorshipContent } from "@/lib/mentorship-mdx";
import { getMentorshipMetadata } from "../shared-metadata";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const mdxComponents = {
  h1: (props: ComponentProps<"h1">) => (
    <h1 className="mb-4 text-2xl font-bold md:text-3xl" {...props} />
  ),
  h2: (props: ComponentProps<"h2">) => (
    <h2 className="mb-3 mt-8 text-xl font-semibold" {...props} />
  ),
  h3: (props: ComponentProps<"h3">) => (
    <h3 className="mb-2 mt-6 text-lg font-semibold" {...props} />
  ),
  p: (props: ComponentProps<"p">) => (
    <p
      className="mb-4 text-sm leading-relaxed text-muted-foreground"
      {...props}
    />
  ),
  ul: (props: ComponentProps<"ul">) => (
    <ul
      className="mb-4 ml-6 list-disc text-sm text-muted-foreground"
      {...props}
    />
  ),
  li: (props: ComponentProps<"li">) => <li className="mb-2" {...props} />,
};

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);
  if (!topic) return { title: "Сэдэв олдсонгүй" };
  return getMentorshipMetadata({
    title: `${topic.title} - Otgondavaa`,
    description: topic.description,
    path: topic.href,
    ogTitle: `${topic.title} - Otgondavaa`,
  });
}

export default async function MentorshipTopicPage({ params }: PageProps) {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);
  if (!topic) notFound();

  // Intro is served by app/mentorship/intro/page.tsx (static route)
  if (slug === "intro") notFound();

  const mdxContent = getMentorshipContent(slug);
  if (!mdxContent) notFound();

  const sectionForSlug = topicIndexSections.filter((s) => s.id === slug);
  if (sectionForSlug.length === 0) notFound();

  return (
    <MentorshipContentLayout
      title={topic.title}
      sections={sectionForSlug}
      variant="detail"
    >
      <Card className="overflow-hidden border-0 shadow-lg bg-card/95 backdrop-blur-sm">
        <CardContent className="px-6 py-6">
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <MDXRemote
              source={mdxContent.content}
              options={{
                mdxOptions: { remarkPlugins: [remarkGfm] },
              }}
              components={mdxComponents}
            />
          </div>
        </CardContent>
      </Card>
    </MentorshipContentLayout>
  );
}
