import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  ILLUSTRATION_PUBLIC_DIR,
  ILLUSTRATION_SOURCE_DIR,
  ILLUSTRATIONS,
} from "../src/data/illustrations";

const OUTPUT_DIR = path.join("public", ILLUSTRATION_PUBLIC_DIR);
const SVG_ELEMENT = /<svg[\s\S]*<\/svg>/;

const minifyStyle = (css: string) =>
  css
    .replace(/\s+/g, " ")
    .replace(/\s*([{};:,])\s*/g, "$1")
    .replace(/;}/g, "}")
    .trim();

const minify = (svg: string) =>
  svg
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(
      /<style>([\s\S]*?)<\/style>/,
      (_, css: string) => `<style>${minifyStyle(css)}</style>`,
    )
    .replace(/>\s+</g, "><")
    .replace(/\s{2,}/g, " ")
    .trim();

async function exportIllustration(file: string) {
  const html = await readFile(
    path.join(ILLUSTRATION_SOURCE_DIR, `${file}.html`),
    "utf8",
  );
  const svg = html.match(SVG_ELEMENT)?.[0];
  if (!svg) throw new Error(`${file}.html has no <svg> element`);
  const output = path.join(OUTPUT_DIR, `${file}.svg`);
  const minified = `${minify(svg)}\n`;
  await writeFile(output, minified);
  console.log(`${output} ${(minified.length / 1024).toFixed(1)} KB`);
}

await mkdir(OUTPUT_DIR, { recursive: true });
await Promise.all(
  Object.values(ILLUSTRATIONS).map(({ file }) => exportIllustration(file)),
);
