import { Footer } from "@/components/site/Footer";

export default function BlogLayout({ children }: LayoutProps<"/blog">) {
  return (
    <>
      <main className="font-inter">{children}</main>
      <Footer />
    </>
  );
}
