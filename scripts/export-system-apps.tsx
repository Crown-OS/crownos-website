import { readFile, writeFile } from "node:fs/promises";
import tailwind from "@tailwindcss/postcss";
import postcss from "postcss";
import { renderToStaticMarkup } from "react-dom/server";
import { APP_VIEWS } from "../src/components/visuals/system-apps/app-views";
import { systemAppsLineupShot } from "../src/data/system-apps";
import { SYSTEM_APPS } from "../src/data/system-apps/stack";

const STYLES_ENTRY = "src/app/globals.css";
const INTER_CSS =
  "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=block";
const WOFF2_AGENT =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36";
const PUBLIC_FROM_HTML = "../../public/";
const { html, window } = systemAppsLineupShot;

async function interFontFace() {
  const css = await (
    await fetch(INTER_CSS, { headers: { "User-Agent": WOFF2_AGENT } })
  ).text();
  const latin = css.split("/* latin */")[1]?.split("}")[0];
  const url = latin?.match(/url\((https:[^)]+)\)/)?.[1];
  if (!latin || !url) throw new Error("Google Fonts sent no latin Inter face");
  const font = Buffer.from(await (await fetch(url)).arrayBuffer()).toString(
    "base64",
  );
  return `${latin.replace(url, `data:font/woff2;base64,${font}`)}}`;
}

async function siteStyles() {
  const source = await readFile(STYLES_ENTRY, "utf8");
  return (await postcss([tailwind()]).process(source, { from: STYLES_ENTRY }))
    .css;
}

const sheetStyles = `
:root { --font-inter-variable: "Inter"; }
html, body { background: transparent; min-height: 0; }
body::before, body::after { display: none; }
body { margin: 0; padding: 48px; display: grid; gap: 48px; justify-content: start; align-content: start; }
.lineup-window { position: relative; width: ${window.width}px; height: ${window.height}px; overflow: hidden; border-radius: 12px; background: #0a0a0b; }
`;

const windows = renderToStaticMarkup(
  <>
    {SYSTEM_APPS.map((app) => (
      <section
        key={app.id}
        data-app={app.id}
        aria-label={app.name}
        className="crownui lineup-window"
      >
        {APP_VIEWS[app.id]}
      </section>
    ))}
  </>,
).replace(/(src|href)="\//g, `$1="${PUBLIC_FROM_HTML}`);

const [fontFace, styles] = await Promise.all([interFontFace(), siteStyles()]);
await writeFile(
  html,
  `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>CrownOS system apps</title>
<style>${fontFace}</style>
<style>${styles}</style>
<style>${sheetStyles}</style>
</head>
<body>
${windows}
</body>
</html>
`,
);
console.log(`Wrote ${SYSTEM_APPS.length} app windows to ${html}`);
