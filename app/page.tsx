import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ButtonLink } from "@/components/ui/button-link";
import { BlogCard } from "@/components/blog-card";
import { RecruiterBanner } from "@/components/recruiter-banner";
import { SubscribeCard } from "@/components/subscribe-card";
import { getLatestPosts } from "@/lib/mdx";
import { ArrowRight } from "lucide-react";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.otgondavaa.com";

export const metadata = {
  title: "otgondavaa.com",
  description:
    "Хөгжүүлэгч, стартап, санхүү, хөрөнгө оруулалт, бизнес, хувь хүний хөгжил.",
  openGraph: {
    title: "otgondavaa.com",
    description:
      "Хөгжүүлэгч, стартап, санхүү, хөрөнгө оруулалт, бизнес, хувь хүний хөгжил.",
    images: [`${siteUrl}/api/og?title=Otgondavaa&siteName=otgondavaa.com`],
  },
};

export const dynamic = "force-static";

export default function Home() {
  const latestPosts = getLatestPosts(2);

  return (
    <>
      <RecruiterBanner />
      <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <Avatar className="mx-auto mb-6 h-32 w-32">
          <AvatarImage src="/images/avatar.jpg" alt="Otgondavaa" />
          <AvatarFallback>OD</AvatarFallback>
        </Avatar>
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Сайн уу, Оогий байна.
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground sm:text-xl">
          Миний вэб хуудсанд зочиллож байгаа таньд баярлалаа. 🙏 <br />
          Миний түлхүүр үгс:{" "}
          <strong>
            Хөгжүүлэгч, стартап, санхүү, хөрөнгө оруулалт, бизнес, хувь хүний
            хөгжил
          </strong>
          .
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <ButtonLink href="/recruiters" variant="default">
            🇺🇸 Résumé for recruiters (English)
          </ButtonLink>
          <ButtonLink href="/blog" variant="outline">
            Миний блогийг унших
          </ButtonLink>
          <ButtonLink href="/calculators" variant="outline">
            Тооцоолуур ашиглах
          </ButtonLink>
        </div>
      </section>

      {/* Latest 2 posts + Subscribe — 3 equal cards */}
      <section className="mb-16">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold">Сүүлийн бичлэгүүд</h2>
          <Link
            href="/blog"
            className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            Бүгдийг харах <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {latestPosts.map((post) => (
            <BlogCard key={post.slug} post={post} variant="compact" />
          ))}
          <SubscribeCard className="flex h-full flex-col" />
        </div>
      </section>
      </div>
    </>
  );
}
