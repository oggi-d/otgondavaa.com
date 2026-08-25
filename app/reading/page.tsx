import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  fetchCurrentlyReadingShelf,
  fetchReadShelf,
  GOODREADS_PROFILE_URL,
  type GoodreadsBook,
} from "@/lib/goodreads";

const DATE_FORMATTER = new Intl.DateTimeFormat("mn-MN", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const LATEST_READS_LIMIT = 18;

export const metadata: Metadata = {
  title: "Миний номын сан - Otgondavaa",
  description:
    "Otgondavaa-гийн номын санд миний уншсан номууд багтана. Стартап, дадал, мөнгө, бүтээлч амьдрал, software/AI сонирхдог Монгол уншигчдад зориулав.",
};

export const revalidate = 21600;

function formatBookDate(book: GoodreadsBook): string {
  const date = book.finishedAt ?? book.addedAt;
  if (!date) {
    return "Огноо байхгүй";
  }

  return DATE_FORMATTER.format(date);
}

function BookGridCard({ book }: { book: GoodreadsBook }) {
  return (
    <Link
      href={book.reviewUrl}
      target="_blank"
      rel="noreferrer"
      className="group block h-full overflow-hidden rounded-xl transition-shadow hover:shadow-md focus-visible:outline focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <Card className="h-full overflow-hidden pt-0 transition-colors group-hover:border-accent/30">
        <div className="relative aspect-[3/4] w-full bg-muted">
          {book.coverImageUrl ? (
            <Image
              src={book.coverImageUrl}
              alt={`${book.title} cover`}
              fill
              sizes="(min-width: 1280px) 16rem, (min-width: 768px) 33vw, 50vw"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center px-6 text-center text-sm text-muted-foreground">
              Зураг байхгүй
            </div>
          )}
        </div>
        <CardHeader className="gap-1">
          <CardTitle className="line-clamp-2 text-base leading-snug transition-colors group-hover:text-accent">
            {book.title}
          </CardTitle>
          <CardDescription className="line-clamp-1">{book.author}</CardDescription>
        </CardHeader>
        <CardContent className="mt-auto">
          <p className="text-sm text-muted-foreground">
            Дуусгасан огноо: {formatBookDate(book)}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}

export default async function ReadingPage() {
  const [readShelf, currentlyReadingShelf] = await Promise.all([
    fetchReadShelf(),
    fetchCurrentlyReadingShelf(),
  ]);

  const latestReads = readShelf.books.slice(0, LATEST_READS_LIMIT);
  const currentlyReading = currentlyReadingShelf.books;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-10 max-w-3xl">
        <h1 className="mb-4 text-4xl font-bold">Миний номын сан</h1>
        <p className="text-lg text-muted-foreground">
          Миний уншиж байгаа болон уншиж дуусгасан номууд нэг дор.{" "}
          <Link
            href={GOODREADS_PROFILE_URL}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-foreground underline underline-offset-4 hover:text-accent"
          >
            Goodreads профайлыг харах
          </Link>
          .
        </p>
      </div>

      <section className="mb-14">
        <h2 className="mb-6 text-3xl font-bold">Сүүлд уншсан</h2>
        {latestReads.length === 0 ? (
          <div className="rounded-xl border border-dashed p-8 text-center">
            <p className="text-muted-foreground">
              {readShelf.isError
                ? "Одоогоор Goodreads-оос уншсан номын мэдээлэл татаж чадсангүй. Дараа дахин оролдоно уу."
                : "Одоогоор уншсан номын мэдээлэл байхгүй байна."}
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {latestReads.map((book) => (
              <BookGridCard key={`${book.id}-${book.reviewUrl}`} book={book} />
            ))}
          </div>
        )}
      </section>

      {currentlyReading.length > 0 && (
        <section>
          <h2 className="mb-6 text-2xl font-bold">Одоо уншиж байгаа</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {currentlyReading.map((book) => (
              <BookGridCard key={`${book.id}-${book.reviewUrl}`} book={book} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
