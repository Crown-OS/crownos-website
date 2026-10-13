import { createHash } from "node:crypto";
import { mkdir, readdir, readFile, rm } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";
import { hero } from "../src/data/hero";
import { frameUrl } from "../src/util/frame-sequence";

const SOURCE_DIR = "assets-src/crownbook-mocks";
const PUBLIC_DIR = "public";
const SOURCE_CROP = { left: 180, top: 200, width: 1240, height: 880 };
const AVIF = { quality: 80, effort: 9, chromaSubsampling: "4:4:4" } as const;

const sequence = hero.laptop.sequence;
const digest = (bytes: Buffer) => createHash("sha256").update(bytes).digest();

async function uniqueSourceFrames() {
  const names = (await readdir(SOURCE_DIR)).sort();
  const frames: Buffer[] = [];
  let previous: Buffer | undefined;
  for (const name of names) {
    const bytes = await readFile(join(SOURCE_DIR, name));
    const hash = digest(bytes);
    if (previous?.equals(hash)) continue;
    previous = hash;
    frames.push(bytes);
  }
  return frames;
}

async function encode(source: Buffer, index: number) {
  const cropped = sharp(source).extract(SOURCE_CROP);
  await Promise.all(
    sequence.tiers.map(async (tier) => {
      const output = join(PUBLIC_DIR, frameUrl(sequence, tier, index));
      await cropped
        .clone()
        .resize({ width: tier.width })
        .avif(AVIF)
        .toFile(output);
    }),
  );
}

const frames = await uniqueSourceFrames();
if (frames.length !== sequence.frames) {
  throw new Error(
    `hero.laptop.sequence.frames is ${sequence.frames}, source has ${frames.length} unique frames`,
  );
}

await rm(join(PUBLIC_DIR, sequence.path), { recursive: true, force: true });
for (const tier of sequence.tiers) {
  await mkdir(join(PUBLIC_DIR, sequence.path, String(tier.width)), {
    recursive: true,
  });
}
await Promise.all(frames.map(encode));
console.log(`Encoded ${frames.length} frames × ${sequence.tiers.length} tiers`);
