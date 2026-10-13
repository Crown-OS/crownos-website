import { appendFile, readFile } from "node:fs/promises";

const OUT_DIR = "out";
const HINTED_ATTRIBUTES = [
  "as",
  "type",
  "crossorigin",
  "fetchpriority",
  "media",
];

const attributesOf = (tag: string) =>
  new Map(
    Array.from(tag.matchAll(/([\w-]+)(?:="([^"]*)")?/g), ([, name, value]) => [
      name.toLowerCase(),
      value ?? "",
    ]),
  );

function linkHeader(tag: string) {
  const attributes = attributesOf(tag);
  const params = HINTED_ATTRIBUTES.filter((name) => attributes.has(name)).map(
    (name) =>
      attributes.get(name) ? `${name}="${attributes.get(name)}"` : name,
  );
  return [`<${attributes.get("href")}>`, "rel=preload", ...params].join("; ");
}

const html = await readFile(`${OUT_DIR}/index.html`, "utf8");
const preloads = html.match(/<link[^>]+rel="preload"[^>]*>/g) ?? [];
const rule = ["", "/", ...preloads.map((tag) => `  Link: ${linkHeader(tag)}`)];
await appendFile(`${OUT_DIR}/_headers`, `${rule.join("\n")}\n`);
console.log(`Added ${preloads.length} Early Hints to ${OUT_DIR}/_headers`);
