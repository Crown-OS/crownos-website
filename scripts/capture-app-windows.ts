import { mkdir, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { appWindowShots, appWindowUrl } from "../src/data/app-windows";
import { openChromePage } from "./headless-chrome";

const PUBLIC_DIR = "public";
const VIEWPORT = { width: 1280, height: 900 };
const { source, directory, window, captureScale, frameColor, left, right } =
  appWindowShots;

type Box = { x: number; y: number; width: number; height: number };

const opaqueFrameStyle = `
  const style = document.createElement("style");
  style.textContent = ".deck-window { background: ${frameColor}; }";
  document.head.append(style);
`;

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
  const loaded = page.once("Page.loadEventFired");
  await page.send("Page.navigate", {
    url: pathToFileURL(resolve(source)).href,
  });
  await loaded;
  await page.evaluate(opaqueFrameStyle);
  await page.evaluate(
    `Promise.all([document.fonts.ready, ...[...document.images].map((image) => image.decode().catch(() => {}))])`,
  );
  await mkdir(join(PUBLIC_DIR, directory), { recursive: true });

  for (const { id } of [...left, ...right]) {
    const clip = await page.evaluate<Box>(`(() => {
      const box = document.querySelector('[data-app="${id}"]').getBoundingClientRect();
      return { x: box.left + scrollX, y: box.top + scrollY, width: box.width, height: box.height };
    })()`);
    if (clip.width !== window.width || clip.height !== window.height) {
      throw new Error(
        `${id} renders ${clip.width}×${clip.height}, expected ${window.width}×${window.height}`,
      );
    }
    const { data } = await page.send<{ data: string }>(
      "Page.captureScreenshot",
      {
        format: "png",
        captureBeyondViewport: true,
        clip: { ...clip, scale: 1 },
      },
    );
    await writeFile(
      join(PUBLIC_DIR, appWindowUrl(id)),
      Buffer.from(data, "base64"),
    );
    console.log(`Captured ${id}`);
  }
} finally {
  await page.close();
}
