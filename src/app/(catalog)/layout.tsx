import type { ReactNode } from "react";
import { Footer, Navbar } from "@/components/site";

export default function CatalogLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="font-content overflow-x-clip">{children}</main>
      <Footer />
    </>
  );
}
