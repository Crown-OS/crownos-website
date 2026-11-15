import type { MDXComponents } from "mdx/types";
import { proseComponents } from "@/components/blog/proseComponents";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...proseComponents, ...components };
}
