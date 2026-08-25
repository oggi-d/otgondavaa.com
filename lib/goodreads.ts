export const DEFAULT_GOODREADS_USER_ID = "109018968";
export const GOODREADS_USER_ID =
  process.env.GOODREADS_USER_ID?.trim() || DEFAULT_GOODREADS_USER_ID;
export const GOODREADS_PROFILE_URL = `https://www.goodreads.com/user/show/${GOODREADS_USER_ID}-otgondavaa-dashnyam`;
export const GOODREADS_REVALIDATE_SECONDS = 60 * 60 * 6;

type GoodreadsShelf = "read" | "currently-reading";

export interface GoodreadsBook {
  id: string;
  title: string;
  author: string;
  coverImageUrl: string | null;
  reviewUrl: string;
  rating: number | null;
  finishedAt: Date | null;
  addedAt: Date | null;
}

export interface GoodreadsShelfResult {
  books: GoodreadsBook[];
  isError: boolean;
}

const GOODREADS_BASE_RSS_URL = `https://www.goodreads.com/review/list_rss/${GOODREADS_USER_ID}`;

function getShelfUrl(shelf: GoodreadsShelf): string {
  return `${GOODREADS_BASE_RSS_URL}?shelf=${shelf}`;
}

function decodeXmlEntities(value: string): string {
  const namedEntities: Record<string, string> = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&apos;": "'",
  };

  return value
    .replace(
      /&(amp|lt|gt|quot|apos);/g,
      (match) => namedEntities[match] || match,
    )
    .replace(/&#(\d+);/g, (_, decimal: string) =>
      String.fromCodePoint(Number.parseInt(decimal, 10)),
    )
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex: string) =>
      String.fromCodePoint(Number.parseInt(hex, 16)),
    );
}

function extractTagValue(itemXml: string, tagName: string): string | null {
  const regex = new RegExp(`<${tagName}(?:\\s[^>]*)?>([\\s\\S]*?)</${tagName}>`);
  const match = itemXml.match(regex);
  if (!match || !match[1]) {
    return null;
  }

  const rawValue = match[1].trim();
  const cdataMatch = rawValue.match(/^<!\[CDATA\[([\s\S]*?)\]\]>$/);
  const value = cdataMatch ? cdataMatch[1] : rawValue;

  return decodeXmlEntities(value.trim());
}

function parseDate(rawDate: string | null): Date | null {
  if (!rawDate) {
    return null;
  }

  const parsedDate = new Date(rawDate);
  if (Number.isNaN(parsedDate.getTime())) {
    return null;
  }

  return parsedDate;
}

function sanitizeHttpsUrl(rawUrl: string | null): string | null {
  if (!rawUrl) {
    return null;
  }

  try {
    const parsedUrl = new URL(rawUrl.trim());
    if (parsedUrl.protocol === "http:") {
      parsedUrl.protocol = "https:";
    }

    if (parsedUrl.protocol !== "https:") {
      return null;
    }

    return parsedUrl.toString();
  } catch {
    return null;
  }
}

function getBookSortTimestamp(book: GoodreadsBook): number {
  return (book.finishedAt ?? book.addedAt)?.getTime() ?? 0;
}

function sortByMostRecent(books: GoodreadsBook[]): GoodreadsBook[] {
  return [...books].sort((left, right) => {
    const dateDifference = getBookSortTimestamp(right) - getBookSortTimestamp(left);
    if (dateDifference !== 0) {
      return dateDifference;
    }

    return left.title.localeCompare(right.title);
  });
}

function parseGoodreadsRss(xml: string): GoodreadsBook[] {
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  const itemMatches = [...xml.matchAll(itemRegex)];

  return itemMatches
    .map((match) => {
      const itemXml = match[1];
      if (!itemXml) {
        return null;
      }

      const id = extractTagValue(itemXml, "book_id");
      const title = extractTagValue(itemXml, "title");

      if (!id || !title) {
        return null;
      }

      const author = extractTagValue(itemXml, "author_name") || "Unknown author";
      const largeCover = extractTagValue(itemXml, "book_large_image_url");
      const mediumCover = extractTagValue(itemXml, "book_medium_image_url");
      const smallCover = extractTagValue(itemXml, "book_image_url");
      const coverImageUrl =
        sanitizeHttpsUrl(largeCover) ||
        sanitizeHttpsUrl(mediumCover) ||
        sanitizeHttpsUrl(smallCover);
      const reviewUrl =
        sanitizeHttpsUrl(extractTagValue(itemXml, "link")) ||
        GOODREADS_PROFILE_URL;
      const ratingRaw = extractTagValue(itemXml, "user_rating");
      const parsedRating = Number.parseInt(ratingRaw || "", 10);
      const rating = Number.isNaN(parsedRating) ? null : parsedRating;
      const finishedAt = parseDate(extractTagValue(itemXml, "user_read_at"));
      const addedAt = parseDate(extractTagValue(itemXml, "user_date_added"));

      return {
        id,
        title,
        author,
        coverImageUrl,
        reviewUrl,
        rating,
        finishedAt,
        addedAt,
      } satisfies GoodreadsBook;
    })
    .filter((book): book is GoodreadsBook => book !== null);
}

async function fetchShelf(shelf: GoodreadsShelf): Promise<GoodreadsShelfResult> {
  const shelfUrl = getShelfUrl(shelf);

  try {
    const response = await fetch(shelfUrl, {
      next: { revalidate: GOODREADS_REVALIDATE_SECONDS },
      headers: {
        Accept: "application/rss+xml, application/xml;q=0.9, text/xml;q=0.8",
      },
    });

    if (!response.ok) {
      throw new Error(`Goodreads RSS returned HTTP ${response.status}`);
    }

    const xml = await response.text();
    const books = sortByMostRecent(parseGoodreadsRss(xml));

    return { books, isError: false };
  } catch (error) {
    console.error(`[goodreads] Failed to fetch "${shelf}" shelf`, error);
    return { books: [], isError: true };
  }
}

export async function fetchReadShelf(): Promise<GoodreadsShelfResult> {
  return fetchShelf("read");
}

export async function fetchCurrentlyReadingShelf(): Promise<GoodreadsShelfResult> {
  return fetchShelf("currently-reading");
}
