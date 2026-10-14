import { useSyncExternalStore } from "react";
import { matchesMedia, mediaQuery } from "./media-query";

export function useMediaQuery(query: string, serverFallback = false) {
  return useSyncExternalStore(
    (notify) => {
      const list = mediaQuery(query);
      list.addEventListener("change", notify);
      return () => list.removeEventListener("change", notify);
    },
    () => matchesMedia(query),
    () => serverFallback,
  );
}
