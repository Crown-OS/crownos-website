import createMDX from "@next/mdx";
import type { NextConfig } from "next";
import { codeTheme } from "./src/data/code-theme";

const nextConfig: NextConfig = {
  output: "export",
  reactCompiler: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      "remark-gfm",
      "remark-frontmatter",
      ["remark-mdx-frontmatter", { name: "frontmatter" }],
    ],
    rehypePlugins: [
      "rehype-slug",
      [
        "rehype-pretty-code",
        {
          theme: codeTheme,
          keepBackground: false,
          defaultLang: { block: "plaintext" },
        },
      ],
    ],
  },
});

export default withMDX(nextConfig);
