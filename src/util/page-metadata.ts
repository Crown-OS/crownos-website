import type { Metadata } from "next";
import { site } from "@/data/site";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  openGraph?: NonNullable<Metadata["openGraph"]>;
};

export function pageMetadata({
  title,
  description,
  path,
  openGraph,
}: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      siteName: site.name,
      locale: site.locale,
      type: "website",
      url: path,
      title,
      description,
      ...openGraph,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
