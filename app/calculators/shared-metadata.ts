import type { Metadata } from "next";

interface CalculatorMetadataProps {
  title: string;
  description: string;
  path: string;
  ogTitle?: string;
}

export function getCalculatorMetadata({
  title,
  description,
  path,
  ogTitle,
}: CalculatorMetadataProps): Metadata {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.otgondavaa.com";
  const displayTitle = ogTitle || title.split(" - ")[0];
  const images = [
    `${siteUrl}/api/og?title=${encodeURIComponent(displayTitle)}&siteName=otgondavaa.com`,
  ];

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      title,
      description,
      url: path,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
  };
}
