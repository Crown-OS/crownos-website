const lists = new Map<string, MediaQueryList>();

export function mediaQuery(query: string) {
  let list = lists.get(query);
  if (!list) {
    list = window.matchMedia(query);
    lists.set(query, list);
  }
  return list;
}

export const matchesMedia = (query: string) => mediaQuery(query).matches;
