import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPostBySlug, getAllPosts } from "@/lib/mdx";
import remarkGfm from "remark-gfm";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import type { Metadata } from "next";
import type { ComponentProps } from "react";

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

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      images: post.coverImage ? [post.coverImage] : [`/api/og?title=${encodeURIComponent(post.title)}&siteName=otgondavaa.com`],
    },
  };
}

const components = {
  h1: (props: ComponentProps<"h1">) => <h1 className="mb-4 text-4xl font-bold" {...props} />,
  h2: (props: ComponentProps<"h2">) => <h2 className="mb-3 mt-8 text-3xl font-bold" {...props} />,
  h3: (props: ComponentProps<"h3">) => <h3 className="mb-2 mt-6 text-2xl font-semibold" {...props} />,
  p: (props: ComponentProps<"p">) => <p className="mb-4 leading-7" {...props} />,
  a: (props: ComponentProps<"a">) => (
    <a className="text-primary underline hover:text-primary/80" {...props} />
  ),
  ul: (props: ComponentProps<"ul">) => <ul className="mb-4 ml-6 list-disc" {...props} />,
  ol: (props: ComponentProps<"ol">) => <ol className="mb-4 ml-6 list-decimal" {...props} />,
  li: (props: ComponentProps<"li">) => <li className="mb-2" {...props} />,
  blockquote: (props: ComponentProps<"blockquote">) => (
    <blockquote className="my-4 border-l-4 border-primary pl-4 italic" {...props} />
  ),
  code: (props: ComponentProps<"code">) => (
    <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono" {...props} />
  ),
  pre: (props: ComponentProps<"pre">) => (
    <pre className="mb-4 overflow-x-auto rounded-lg bg-muted p-4" {...props} />
  ),
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
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
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        <h1 className="mb-4 text-4xl font-bold">{post.title}</h1>
        <p className="mb-6 text-lg text-muted-foreground">{post.summary}</p>
        <time className="text-sm text-muted-foreground">
          {format(new Date(post.date), "MMMM d, yyyy")}
        </time>
        {post.coverImage && (
          <div className="relative mt-8 h-64 w-full overflow-hidden rounded-lg md:h-96">
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
      </header>
      <div className="prose prose-lg dark:prose-invert prose-headings:font-bold prose-a:text-primary prose-a:no-underline hover:prose-a:underline max-w-none">
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
    </article>
  );
}
