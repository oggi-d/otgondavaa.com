import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { BlogPost } from "@/lib/mdx";
import { format } from "date-fns";

type BlogCardPost = Pick<
  BlogPost,
  "slug" | "title" | "date" | "summary" | "tags" | "coverImage"
>;

interface BlogCardProps {
  post: BlogCardPost;
  /** "compact" for home page (smaller cover, smaller text), "default" for blog list */
  variant?: "compact" | "default";
}

export function BlogCard({ post, variant = "default" }: BlogCardProps) {
  const isCompact = variant === "compact";
  const coverHeight = isCompact ? "h-48" : "h-56";
  const titleClass = isCompact
    ? "transition-colors group-hover:text-primary"
    : "text-xl transition-colors group-hover:text-primary";
  const summaryClass = isCompact
    ? "text-sm text-muted-foreground"
    : "text-muted-foreground";

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block h-full overflow-hidden rounded-lg transition-shadow hover:shadow-lg focus-visible:outline focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <Card className="flex h-full flex-col cursor-pointer transition-colors group-hover:border-primary/30">
        {post.coverImage && (
          <div
            className={`relative w-full shrink-0 overflow-hidden rounded-t-lg ${coverHeight}`}
          >
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
        <CardHeader>
          <div className="mb-2 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="default">
                {tag}
              </Badge>
            ))}
          </div>
          <CardTitle className={titleClass}>{post.title}</CardTitle>
          <CardDescription>
            {format(new Date(post.date), "yyyy/MM/dd")}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          <p className={summaryClass}>{post.summary}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
