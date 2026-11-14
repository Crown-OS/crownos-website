import { mkdir } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import sharp from "sharp";
import { systemAppsLineupShot } from "../src/data/system-apps";
import { shotUrl } from "../src/util/shot-url";
import { openChromePage } from "./headless-chrome";
import { composeLineupScript, LINEUP_STAGE_SELECTOR } from "./lineup-stage";

const PUBLIC_DIR = "public";
const VIEWPORT = { width: 1600, height: 900 };
const AVIF = { quality: 72, effort: 6, chromaSubsampling: "4:4:4" } as const;
const { html, stage, captureScale, widths } = systemAppsLineupShot;

type Box = { x: number; y: number; width: number; height: number };

const page = await openChromePage();
try {
  await page.send("Page.enable");
  await page.send("Emulation.setDeviceMetricsOverride", {
    ...VIEWPORT,
    deviceScaleFactor: captureScale,
    mobile: false,
  });
  await page.send("Emulation.setEmulatedMedia", {
    features: [{ name: "prefers-reduced-motion", value: "reduce" }],
  });
  await page.send("Emulation.setDefaultBackgroundColorOverride", {
    color: { r: 0, g: 0, b: 0, a: 0 },
  });
  const loaded = page.once("Page.loadEventFired");
  await page.send("Page.navigate", { url: pathToFileURL(resolve(html)).href });
  await loaded;
  await page.evaluate(
    `Promise.all([document.fonts.ready, ...[...document.images].map((image) => image.decode().catch(() => {}))])`,
  );
  await page.evaluate(composeLineupScript);
  await page.evaluate("new Promise((done) => setTimeout(done, 500))");

  const clip = await page.evaluate<Box>(`(() => {
    const box = document.querySelector("${LINEUP_STAGE_SELECTOR}").getBoundingClientRect();
    return { x: box.left + scrollX, y: box.top + scrollY, width: box.width, height: box.height };
  })()`);
  if (clip.width !== stage.width || clip.height !== stage.height) {
    throw new Error(
      `lineup renders ${clip.width}×${clip.height}, expected ${stage.width}×${stage.height}`,
    );
  }
  const { data } = await page.send<{ data: string }>("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: true,
    clip: { ...clip, scale: 1 },
  });
  const shot = Buffer.from(data, "base64");
  await mkdir(join(PUBLIC_DIR, dirname(systemAppsLineupShot.path)), {
    recursive: true,
  });
  await Promise.all(
    widths.map((width) =>
      sharp(shot)
        .resize({ width })
        .avif(AVIF)
        .toFile(join(PUBLIC_DIR, shotUrl(systemAppsLineupShot, width))),
    ),
  );
  console.log(`Captured the system apps lineup × ${widths.length} tiers`);
} finally {
  await page.close();
}
