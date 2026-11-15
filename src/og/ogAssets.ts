import { readFile } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";

const OG_ROOT = path.join(process.cwd(), "src", "og");

const readAsset = (...segments: string[]) =>
  readFile(path.join(OG_ROOT, ...segments));

const pngDataUrl = async (name: string) =>
  `data:image/png;base64,${(await readAsset("images", name)).toString("base64")}`;

export const loadOgFonts = cache(async () => {
  const [clashMedium, interRegular, interMedium, instrumentItalic] =
    await Promise.all([
      readAsset("fonts", "ClashDisplay-Medium.ttf"),
      readAsset("fonts", "Inter-Regular.ttf"),
      readAsset("fonts", "Inter-Medium.ttf"),
      readAsset("fonts", "InstrumentSerif-Italic.ttf"),
    ]);
  return [
    { name: "Clash Display", data: clashMedium, weight: 500, style: "normal" },
    { name: "Inter", data: interRegular, weight: 400, style: "normal" },
    { name: "Inter", data: interMedium, weight: 500, style: "normal" },
    {
      name: "Instrument Serif",
      data: instrumentItalic,
      weight: 400,
      style: "italic",
    },
  ] as const;
});

export const loadOgImages = cache(async () => {
  const [laptop, grain] = await Promise.all([
    pngDataUrl("crownbook-front.png"),
    pngDataUrl("grain.png"),
  ]);
  return { laptop, grain };
});
