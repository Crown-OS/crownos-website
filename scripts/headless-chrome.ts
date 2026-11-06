import { spawn } from "node:child_process";
import { once } from "node:events";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { setTimeout as sleep } from "node:timers/promises";

const CHROME_BIN = process.env.CHROME_BIN ?? "chromium";
const PORT_POLL_MS = 100;
const PORT_POLL_TRIES = 100;

type Pending = {
  resolve: (value: unknown) => void;
  reject: (error: Error) => void;
};

export type ChromePage = {
  send: <T = Record<string, unknown>>(
    method: string,
    params?: object,
  ) => Promise<T>;
  once: (event: string) => Promise<void>;
  evaluate: <T>(expression: string) => Promise<T>;
  close: () => Promise<void>;
};

async function debuggingPort(profile: string) {
  for (let tries = 0; tries < PORT_POLL_TRIES; tries++) {
    const port = await readFile(
      join(profile, "DevToolsActivePort"),
      "utf8",
    ).catch(() => "");
    if (port) return port.split("\n")[0];
    await sleep(PORT_POLL_MS);
  }
  throw new Error(`${CHROME_BIN} did not open a debugging port`);
}

export async function openChromePage(): Promise<ChromePage> {
  const profile = await mkdtemp(join(tmpdir(), "crownos-chrome-"));
  const chrome = spawn(
    CHROME_BIN,
    [
      "--headless=new",
      "--remote-debugging-port=0",
      `--user-data-dir=${profile}`,
      "--hide-scrollbars",
      "--no-first-run",
      "about:blank",
    ],
    { stdio: "ignore" },
  );
  const port = await debuggingPort(profile);
  const targets: { type: string; webSocketDebuggerUrl: string }[] = await (
    await fetch(`http://127.0.0.1:${port}/json/list`)
  ).json();
  const target = targets.find(({ type }) => type === "page");
  if (!target) throw new Error("headless Chrome opened no page");

  const socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve) =>
    socket.addEventListener("open", resolve, { once: true }),
  );
  const pending = new Map<number, Pending>();
  const waiters = new Map<string, () => void>();
  let lastId = 0;
  socket.addEventListener("message", ({ data }) => {
    const message = JSON.parse(String(data));
    const call = pending.get(message.id);
    if (call) {
      pending.delete(message.id);
      if (message.error) call.reject(new Error(`${message.error.message}`));
      else call.resolve(message.result);
    } else waiters.get(message.method)?.();
  });

  const send: ChromePage["send"] = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const id = ++lastId;
      pending.set(id, { resolve: resolve as Pending["resolve"], reject });
      socket.send(JSON.stringify({ id, method, params }));
    });
  return {
    send,
    once: (event) => new Promise((resolve) => waiters.set(event, resolve)),
    evaluate: async (expression) => {
      const { result, exceptionDetails } = await send<{
        result: { value: unknown };
        exceptionDetails?: { text: string };
      }>("Runtime.evaluate", {
        expression,
        awaitPromise: true,
        returnByValue: true,
      });
      if (exceptionDetails) throw new Error(exceptionDetails.text);
      return result.value as never;
    },
    close: async () => {
      socket.close();
      const exited = once(chrome, "exit");
      chrome.kill();
      await exited;
      await rm(profile, { recursive: true, force: true });
    },
  };
}
