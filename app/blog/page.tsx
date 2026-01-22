import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAllPosts } from "@/lib/mdx";
import { format } from "date-fns";

export const metadata = {
  title: "Blog - Otgondavaa",
  description: "Read my latest thoughts on development, finance, and more.",
};

export const dynamic = 'force-static';

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-bold">Blog</h1>
        <p className="text-lg text-muted-foreground">
          Thoughts, tutorials, and insights on development, finance, and life.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No blog posts yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Card key={post.slug} className="flex flex-col hover:shadow-lg transition-shadow">
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
      )}
    </div>
  );
}
