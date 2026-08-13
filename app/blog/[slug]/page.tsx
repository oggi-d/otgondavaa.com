import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPostBySlug, getAllPosts } from "@/lib/mdx";
import remarkGfm from "remark-gfm";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { SubscribeCard } from "@/components/subscribe-card";
import Image from "next/image";
import type { Metadata } from "next";
import type { ComponentProps } from "react";

export const dynamicParams = false;
const DEFAULT_SITE_URL = "https://www.otgondavaa.com";

function normalizeSiteUrl(siteUrl: string): string {
  return siteUrl.endsWith("/") ? siteUrl.slice(0, -1) : siteUrl;
}

function toAbsoluteUrl(url: string, siteUrl: string): string {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  return `${siteUrl}${url.startsWith("/") ? url : `/${url}`}`;
}

function appendCacheBust(url: string): string {
  return `${url}${url.includes("?") ? "&" : "?"}v=2`;
}

function getImageType(url: string): string {
  const [pathWithoutQuery] = url.split("?");
  const lowerPath = pathWithoutQuery.toLowerCase();

  if (lowerPath.endsWith(".png")) {
    return "image/png";
  }

  if (lowerPath.endsWith(".jpg") || lowerPath.endsWith(".jpeg")) {
    return "image/jpeg";
  }

  if (lowerPath.endsWith(".webp")) {
    return "image/webp";
  }

  return "image/png";
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const siteUrl = normalizeSiteUrl(
    process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL,
  );
  const canonicalUrl = `${siteUrl}/blog/${slug}`;
  const baseImageUrl = post.coverImage
    ? toAbsoluteUrl(post.coverImage, siteUrl)
    : `${siteUrl}/api/og?title=${encodeURIComponent(post.title)}&siteName=otgondavaa.com`;
  const cacheBustedImageUrl = appendCacheBust(baseImageUrl);
  const imageType = getImageType(baseImageUrl);

  const openGraphImage = {
    url: cacheBustedImageUrl,
    type: imageType,
    alt: post.title,
    ...(typeof post.coverWidth === "number" ? { width: post.coverWidth } : {}),
    ...(typeof post.coverHeight === "number"
      ? { height: post.coverHeight }
      : {}),
  };

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      url: canonicalUrl,
      type: "article",
      title: post.title,
      description: post.summary,
      images: openGraphImage,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
      images: [cacheBustedImageUrl],
    },
  };
}

const components = {
  h1: (props: ComponentProps<"h1">) => (
    <h1 className="mb-4 text-4xl font-bold" {...props} />
  ),
  h2: (props: ComponentProps<"h2">) => (
    <h2 className="mb-3 mt-8 text-3xl font-bold" {...props} />
  ),
  h3: (props: ComponentProps<"h3">) => (
    <h3 className="mb-2 mt-6 text-2xl font-semibold" {...props} />
  ),
  p: (props: ComponentProps<"p">) => (
    <p className="mb-4 leading-7" {...props} />
  ),
  a: (props: ComponentProps<"a">) => (
    <a className="text-accent underline hover:text-accent/80" {...props} />
  ),
  ul: (props: ComponentProps<"ul">) => (
    <ul className="mb-4 ml-6 list-disc" {...props} />
  ),
  ol: (props: ComponentProps<"ol">) => (
    <ol className="mb-4 ml-6 list-decimal" {...props} />
  ),
  li: (props: ComponentProps<"li">) => <li className="mb-2" {...props} />,
  blockquote: (props: ComponentProps<"blockquote">) => (
    <blockquote
      className="my-4 border-l-4 border-primary pl-4 italic"
      {...props}
    />
  ),
  code: (props: ComponentProps<"code">) => (
    <code
      className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono"
      {...props}
    />
  ),
  pre: (props: ComponentProps<"pre">) => (
    <pre className="mb-4 overflow-x-auto rounded-lg bg-muted p-4" {...props} />
  ),
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto max-w-3xl px-4 py-12">
      <header className="mb-8">
        <div className="mb-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="default">
              {tag}
            </Badge>
          ))}
        </div>
        <h1 className="mb-4 text-4xl font-bold">{post.title}</h1>
        <p className="mb-6 text-lg text-muted-foreground">{post.summary}</p>
        <time className="text-sm text-muted-foreground">
          {format(new Date(post.date), "yyyy/MM/dd")}
        </time>
        {post.coverImage && (
          <div className="relative mt-8 h-64 w-full overflow-hidden rounded-lg md:h-96">
            {post.coverImage.endsWith(".svg") ? (
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
      </header>
      <div className="prose prose-lg dark:prose-invert prose-headings:font-bold prose-a:text-accent prose-a:no-underline hover:prose-a:underline max-w-none">
        <MDXRemote
          source={post.content}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
            },
          }}
          components={components}
        />
      </div>
      <aside className="mt-12">
        <SubscribeCard />
      </aside>
    </article>
  );
}
