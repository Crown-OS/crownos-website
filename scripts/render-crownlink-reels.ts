import { spawn } from "node:child_process";
import { once } from "node:events";
import { mkdir, rm, writeFile } from "node:fs/promises";
import { homedir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { parseArgs } from "node:util";
import { openChromePage } from "./headless-chrome";

const REEL_SOURCE = "assets-src/crownlink-reels";
const WEB_DIRECTORY = "public/crownlink/v1";
const POSTER_SHARE = 0.46;
const STAGE = { width: 1080, height: 1440 };
const SUBFRAMES = 4;
const SHUTTER = 0.5;

const { values, positionals } = parseArgs({
  args: process.argv.slice(2),
  allowPositionals: true,
  options: {
    stills: { type: "string" },
    out: {
      type: "string",
      default: join(homedir(), "Edits/Renders/crownlink-reels"),
    },
    "no-bundle": { type: "boolean", default: false },
  },
});

async function run(command: string, args: string[]) {
  const child = spawn(command, args, {
    stdio: ["ignore", "inherit", "inherit"],
  });
  const [code] = await once(child, "exit");
  if (code !== 0) throw new Error(`${command} exited with ${code}`);
}

async function bundle() {
  await run("bun", [
    "build",
    `${REEL_SOURCE}/src/main.tsx`,
    "--outdir",
    `${REEL_SOURCE}/dist`,
    "--format",
    "iife",
    "--minify",
    "--define",
    'process.env.NODE_ENV="production"',
  ]);
}

async function openReel(sceneId: string) {
  const page = await openChromePage();
  await page.send("Page.enable");
  await page.send("Emulation.setDeviceMetricsOverride", {
    ...STAGE,
    deviceScaleFactor: 1,
    mobile: false,
  });
  const loaded = page.once("Page.loadEventFired");
  await page.send("Page.navigate", {
    url: `${pathToFileURL(resolve(REEL_SOURCE, "reel.html")).href}#${sceneId}`,
  });
  await loaded;
  await page.evaluate("window.reel.ready");
  return page;
}

async function capture(
  page: Awaited<ReturnType<typeof openReel>>,
  time: number,
) {
  await page.evaluate(`window.reel.seek(${time})`);
  const { data } = await page.send<{ data: string }>("Page.captureScreenshot", {
    format: "png",
    clip: { x: 0, y: 0, ...STAGE, scale: 1 },
  });
  return Buffer.from(data, "base64");
}

async function renderStills(
  sceneId: string,
  times: number[],
  directory: string,
) {
  const page = await openReel(sceneId);
  try {
    for (const time of times) {
      await writeFile(
        join(directory, `${sceneId}-${time.toFixed(2)}.png`),
        await capture(page, time),
      );
    }
  } finally {
    await page.close();
  }
}

async function renderMaster(sceneId: string, directory: string) {
  const frameDirectory = join(directory, `${sceneId}-frames`);
  await rm(frameDirectory, { recursive: true, force: true });
  await mkdir(frameDirectory, { recursive: true });
  const page = await openReel(sceneId);
  const { duration, fps } = await page.evaluate<{
    duration: number;
    fps: number;
  }>("({ duration: window.reel.duration, fps: window.reel.fps })");
  const frameCount = Math.round(duration * fps);
  try {
    for (let frame = 0; frame < frameCount; frame++) {
      for (let subframe = 0; subframe < SUBFRAMES; subframe++) {
        const offset = ((subframe + 0.5) / SUBFRAMES - 0.5) * SHUTTER;
        const time = Math.max(0, (frame + offset) / fps);
        const index = frame * SUBFRAMES + subframe;
        await writeFile(
          join(frameDirectory, `${String(index).padStart(6, "0")}.png`),
          await capture(page, time),
        );
      }
      if (frame % fps === 0) console.log(`${sceneId}: ${frame}/${frameCount}`);
    }
  } finally {
    await page.close();
  }

  const master = join(directory, `${sceneId}.mov`);
  await run("ffmpeg", [
    "-y",
    "-v",
    "error",
    "-framerate",
    String(fps * SUBFRAMES),
    "-i",
    join(frameDirectory, "%06d.png"),
    "-vf",
    `tmix=frames=${SUBFRAMES},select='eq(mod(n\\,${SUBFRAMES})\\,${SUBFRAMES - 1})',setpts=N/(${fps}*TB)`,
    "-r",
    String(fps),
    "-c:v",
    "prores_ks",
    "-profile:v",
    "3",
    "-pix_fmt",
    "yuv422p10le",
    master,
  ]);
  await rm(frameDirectory, { recursive: true, force: true });
  await encodeForWeb(sceneId, master, duration);
  console.log(`${sceneId}: wrote ${master} and web encodes`);
}

async function encodeForWeb(sceneId: string, master: string, duration: number) {
  await mkdir(WEB_DIRECTORY, { recursive: true });
  const target = (extension: string) =>
    join(WEB_DIRECTORY, `${sceneId}.${extension}`);
  const quiet = ["-y", "-v", "error", "-i", master];
  await run("ffmpeg", [
    ...quiet,
    "-c:v",
    "libx264",
    "-preset",
    "slow",
    "-crf",
    "23",
    "-pix_fmt",
    "yuv420p",
    "-movflags",
    "+faststart",
    "-an",
    target("mp4"),
  ]);
  await run("ffmpeg", [
    ...quiet,
    "-c:v",
    "libsvtav1",
    "-preset",
    "5",
    "-crf",
    "36",
    "-pix_fmt",
    "yuv420p10le",
    "-svtav1-params",
    "log-level=0",
    "-an",
    target("webm"),
  ]);
  await run("ffmpeg", [
    "-y",
    "-v",
    "error",
    "-ss",
    String(duration * POSTER_SHARE),
    "-i",
    master,
    "-frames:v",
    "1",
    "-c:v",
    "libwebp",
    "-quality",
    "82",
    target("webp"),
  ]);
}

if (!values["no-bundle"]) await bundle();
await mkdir(values.out, { recursive: true });
const sceneIds = positionals.length > 0 ? positionals : ["clipboard"];
for (const sceneId of sceneIds) {
  if (values.stills)
    await renderStills(
      sceneId,
      values.stills.split(",").map(Number),
      values.out,
    );
  else await renderMaster(sceneId, values.out);
}
