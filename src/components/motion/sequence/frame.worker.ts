import { createPlayerHost, type PlayerCommand } from "./player-host";

const host = createPlayerHost();

addEventListener("message", (event: MessageEvent<PlayerCommand>) =>
  host(event.data),
);
