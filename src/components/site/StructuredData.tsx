import { site } from "@/data/site";

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: site.name,
  url: site.url,
  description: site.description,
  applicationCategory: "OperatingSystem",
  operatingSystem: "Linux",
  keywords: site.keywords.join(", "),
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  sameAs: [site.repository],
};

export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: escaped JSON-LD payload
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(softwareSchema).replace(/</g, "\\u003c"),
      }}
    />
  );
}
