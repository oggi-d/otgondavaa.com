import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SubscribeForm } from "@/components/subscribe-form";
import { getLatestPosts } from "@/lib/mdx";
import { format } from "date-fns";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Otgondavaa - Developer & Writer",
  description: "Welcome to my personal website. Explore my blog, use financial calculators, and get in touch.",
  openGraph: {
    title: "Otgondavaa - Developer & Writer",
    description: "Welcome to my personal website. Explore my blog, use financial calculators, and get in touch.",
    images: ["/api/og?title=Otgon%20Davaa&siteName=otgondavaa.com"],
  },
};

export const dynamic = 'force-static';

export default function Home() {
  const latestPosts = getLatestPosts(3);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <Avatar className="mx-auto mb-6 h-32 w-32">
          <AvatarImage src="/images/avatar.jpg" alt="Otgondavaa" />
          <AvatarFallback>OD</AvatarFallback>
        </Avatar>
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Hi, I&apos;m Otgondavaa
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground sm:text-xl">
          Developer, writer, and financial enthusiast. Welcome to my corner of the internet where I share thoughts,
          build tools, and connect with the community.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/blog">
            <button className="rounded-lg bg-primary px-6 py-3 text-primary-foreground transition-colors hover:bg-primary/90">
              Read My Blog
            </button>
          </Link>
          <Link href="/calculators">
            <button className="rounded-lg border border-border bg-background px-6 py-3 transition-colors hover:bg-accent">
              Try Calculators
            </button>
          </Link>
        </div>
      </section>

      {/* Latest Blog Posts */}
      {latestPosts.length > 0 && (
        <section className="mb-16">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-3xl font-bold">Latest Posts</h2>
            <Link
              href="/blog"
              className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post) => (
              <Card key={post.slug} className="flex flex-col">
                {post.coverImage && (
                  <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                    {post.coverImage.endsWith('.svg') ? (
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                )}
                <CardHeader>
                  <div className="mb-2 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <CardTitle>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-primary transition-colors"
                    >
                      {post.title}
                    </Link>
                  </CardTitle>
                  <CardDescription>
                    {format(new Date(post.date), "MMMM d, yyyy")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-sm text-muted-foreground">{post.summary}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Subscribe Section */}
      <section className="mx-auto max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>Subscribe to Updates</CardTitle>
            <CardDescription>
              Get notified when I publish new posts or release new calculators.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SubscribeForm />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
