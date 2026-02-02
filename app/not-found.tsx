import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 py-12 text-center">
      <h1 className="mb-4 text-6xl font-bold">404</h1>
      <h2 className="mb-4 text-2xl font-semibold">Хуудас олдсонгүй</h2>
      <p className="mb-8 text-muted-foreground">
        Таны хайж буй хуудас байхгүй эсвэл шилжүүлэгдсэн байна.
      </p>
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/">Нүүр хуудас руу</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/blog">Блог харах</Link>
        </Button>
      </div>
    </div>
  );
}
