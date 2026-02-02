import { BlogCard } from "@/components/blog-card";
import { SubscribeCard } from "@/components/subscribe-card";
import { getAllPosts } from "@/lib/mdx";

export const metadata = {
  title: "Blog - Otgondavaa",
  description: "Read my latest thoughts on development, finance, and more.",
};

export const dynamic = "force-static";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-bold">Блог</h1>
        <p className="text-lg text-muted-foreground">
          Програм хөгжүүлэлт, санхүүгийн боловсрол, амьдралын тухай бодол, хувь
          хүний хөгжил, гарын авлага.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">
            Бичлэг байхгүй байна. Дараа дахин ирээрэй.
          </p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, 2).map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
          <SubscribeCard className="flex h-full flex-col" />
          {posts.slice(2).map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
