import { appendFile, readdir, readFile } from "node:fs/promises";

const OUT_DIR = "out";
const UNHINTED_PAGES = new Set(["404", "_not-found"]);
const HINTED_ATTRIBUTES = [
  "as",
  "type",
  "crossorigin",
  "fetchpriority",
  "media",
];
const PRELOAD_TAG = /<link[^>]+rel="preload"[^>]*>/g;
const STYLESHEET_TAG = /<link[^>]+rel="stylesheet"[^>]*>/g;

const attributesOf = (tag: string) =>
  new Map(
    Array.from(tag.matchAll(/([\w-]+)(?:="([^"]*)")?/g), ([, name, value]) => [
      name.toLowerCase(),
      value ?? "",
    ]),
  );

function preloadHeader(tag: string) {
  const attributes = attributesOf(tag);
  const params = HINTED_ATTRIBUTES.filter((name) => attributes.has(name)).map(
    (name) =>
      attributes.get(name) ? `${name}="${attributes.get(name)}"` : name,
  );
  return [`<${attributes.get("href")}>`, "rel=preload", ...params].join("; ");
}

const stylesheetHeader = (tag: string) =>
  `<${attributesOf(tag).get("href")}>; rel=preload; as="style"`;

const routeOf = (page: string) =>
  page === "index" ? "/" : `/${page.replace(/\/index$/, "")}`;

async function hintRule(file: string) {
  const html = await readFile(`${OUT_DIR}/${file}`, "utf8");
  const links = [
    ...(html.match(STYLESHEET_TAG) ?? []).map(stylesheetHeader),
    ...(html.match(PRELOAD_TAG) ?? []).map(preloadHeader),
  ];
  const route = routeOf(file.slice(0, -".html".length));
  return {
    links: links.length,
    rule: [route, ...links.map((link) => `  Link: ${link}`)],
  };
}

const pages = (await readdir(OUT_DIR, { recursive: true })).filter(
  (file) =>
    file.endsWith(".html") &&
    !UNHINTED_PAGES.has(file.slice(0, -".html".length)),
);
const rules = await Promise.all(pages.sort().map(hintRule));
const hinted = rules.filter(({ links }) => links > 0);

await appendFile(
  `${OUT_DIR}/_headers`,
  hinted.map(({ rule }) => `\n${rule.join("\n")}\n`).join(""),
);
console.log(
  `Added Early Hints for ${hinted.length} pages to ${OUT_DIR}/_headers`,
);
