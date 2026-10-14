import { mkdir, rm } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";
import { hero } from "../src/data/hero";
import { deviceUrl } from "../src/util/device-still";

const SOURCE_DIR = "assets-src/devices";
const PUBLIC_DIR = "public";
const RENDER_SCALE = 3;
const AVIF = { quality: 72, effort: 9, chromaSubsampling: "4:4:4" } as const;

const devices = Object.values(hero.ecosystem.devices);
const paths = new Set(
  devices.map(({ path }) => path.slice(0, path.lastIndexOf("/"))),
);
for (const path of paths) {
  await rm(join(PUBLIC_DIR, path), { recursive: true, force: true });
  await mkdir(join(PUBLIC_DIR, path), { recursive: true });
}

for (const device of devices) {
  const name = device.path.slice(device.path.lastIndexOf("/") + 1);
  const trimmed = await sharp(join(SOURCE_DIR, `${name}.webp`))
    .trim({ threshold: 0 })
    .toBuffer({ resolveWithObject: true });
  const frameSize = {
    width: Math.round(trimmed.info.width / RENDER_SCALE),
    height: Math.round(trimmed.info.height / RENDER_SCALE),
  };
  if (
    frameSize.width !== device.size.width ||
    frameSize.height !== device.size.height
  ) {
    throw new Error(
      `${name}: set size to ${JSON.stringify(frameSize)} in hero.ecosystem.devices`,
    );
  }
  await Promise.all(
    device.widths.map((width) =>
      sharp(trimmed.data)
        .resize({ width })
        .avif(AVIF)
        .toFile(join(PUBLIC_DIR, deviceUrl(device, width))),
    ),
  );
}
console.log(`Encoded ${devices.length} device stills`);
