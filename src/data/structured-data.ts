import { findAuthor, type PostMeta } from "./blog";
import { site } from "./site";
import { teamMembers } from "./team";

const creator = teamMembers.find(({ id }) => id === site.creatorId);
const absolute = (pathname: string) => new URL(pathname, site.url).toString();

const organization = {
  "@type": "Organization",
  "@id": absolute("/#organization"),
  name: site.name,
  url: site.url,
  logo: absolute("/icon.svg"),
  sameAs: [site.repository, site.community],
};

const person = (name: string, url?: string) => ({
  "@type": "Person",
  name,
  ...(url && { url }),
});

export const homeStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    organization,
    {
      "@type": "WebSite",
      "@id": absolute("/#website"),
      name: site.name,
      url: site.url,
      description: site.description,
      publisher: { "@id": organization["@id"] },
      inLanguage: "en",
    },
    {
      "@type": "SoftwareApplication",
      name: site.name,
      description: site.description,
      url: site.url,
      image: absolute("/opengraph-image"),
      applicationCategory: "OperatingSystem",
      operatingSystem: "Linux",
      downloadUrl: site.download,
      license: site.license,
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      publisher: { "@id": organization["@id"] },
      ...(creator && {
        author: person(creator.name, creator.links.portfolio),
      }),
    },
  ],
};

export function postStructuredData(meta: PostMeta) {
  const author = findAuthor(meta.author);
  const url = absolute(`/blog/${meta.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: meta.title,
    description: meta.description,
    datePublished: meta.date,
    dateModified: meta.date,
    url,
    mainEntityOfPage: url,
    image: absolute(`/blog/${meta.slug}/opengraph-image`),
    author: person(author.name, author.links.portfolio),
    publisher: organization,
    inLanguage: "en",
  };
}
