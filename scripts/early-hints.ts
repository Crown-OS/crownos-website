import { appendFile, readdir, readFile } from "node:fs/promises";

const OUT_DIR = "out";
const HEADERS_FILE = `${OUT_DIR}/_headers`;
const CLOUDFLARE_RULE_LIMIT = 100;
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
const HTML_ENTITIES: Record<string, string> = {
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#x27;": "'",
  "&amp;": "&",
};

type Rule = { route: string; links: string[] };

const decodeEntities = (value: string) =>
  value.replace(
    /&(?:lt|gt|quot|#x27|amp);/g,
    (entity) => HTML_ENTITIES[entity],
  );

const attributesOf = (tag: string) =>
  new Map(
    Array.from(tag.matchAll(/([\w-]+)(?:="([^"]*)")?/g), ([, name, value]) => [
      name.toLowerCase(),
      decodeEntities(value ?? ""),
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

const sectionOf = (route: string) => route.split("/")[1];

async function pageRule(file: string): Promise<Rule> {
  const html = await readFile(`${OUT_DIR}/${file}`, "utf8");
  return {
    route: routeOf(file.slice(0, -".html".length)),
    links: [
      ...(html.match(STYLESHEET_TAG) ?? []).map(stylesheetHeader),
      ...(html.match(PRELOAD_TAG) ?? []).map(preloadHeader),
    ],
  };
}

function sectionRules(section: string, rules: Rule[]): Rule[] {
  const [{ links }] = rules;
  const sharesLinks = rules.every((rule) => rule.links.join() === links.join());
  if (rules.length === 1 || !sharesLinks) return rules;
  return [
    { route: `/${section}`, links },
    { route: `/${section}/*`, links },
  ];
}

const pages = (await readdir(OUT_DIR, { recursive: true })).filter(
  (file) =>
    file.endsWith(".html") &&
    !UNHINTED_PAGES.has(file.slice(0, -".html".length)),
);
const hinted = (await Promise.all(pages.sort().map(pageRule))).filter(
  ({ links }) => links.length > 0,
);
const sections = Map.groupBy(hinted, ({ route }) => sectionOf(route));
const rules = Array.from(sections, ([section, sectionPages]) =>
  sectionRules(section, sectionPages),
).flat();

const baseRuleCount = (await readFile(HEADERS_FILE, "utf8"))
  .split("\n")
  .filter((line) => line.startsWith("/")).length;
const totalRuleCount = baseRuleCount + rules.length;
if (totalRuleCount > CLOUDFLARE_RULE_LIMIT) {
  throw new Error(
    `${HEADERS_FILE} needs ${totalRuleCount} rules; Cloudflare allows ${CLOUDFLARE_RULE_LIMIT}`,
  );
}

await appendFile(
  HEADERS_FILE,
  rules
    .map(({ route, links }) =>
      [`\n${route}`, ...links.map((link) => `  Link: ${link}`)].join("\n"),
    )
    .join("\n")
    .concat("\n"),
);
console.log(
  `Added Early Hints for ${hinted.length} pages in ${rules.length} rules (${totalRuleCount}/${CLOUDFLARE_RULE_LIMIT}) to ${HEADERS_FILE}`,
);
