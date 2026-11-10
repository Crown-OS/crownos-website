import { createPlayerHost, type PlayerCommand } from "./player-host";

const host = createPlayerHost((ratio) => postMessage(ratio));

addEventListener("message", (event: MessageEvent<PlayerCommand>) =>
  host(event.data),
);
