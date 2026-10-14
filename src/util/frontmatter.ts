type FrontmatterRecord = Record<string, unknown>;

const HEX_COLOR = /^#[0-9a-f]{6}$/i;

export class FrontmatterError extends Error {
  override name = "FrontmatterError";
}

const isRecord = (value: unknown): value is FrontmatterRecord =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export function readFrontmatter(source: string, value: unknown) {
  if (!isRecord(value)) {
    throw new FrontmatterError(`${source}: frontmatter is missing`);
  }

  const fail = (key: string, expected: string): never => {
    throw new FrontmatterError(`${source}: "${key}" must be ${expected}`);
  };

  const text = (key: string) => {
    const field = value[key];
    return typeof field === "string" && field.trim()
      ? field.trim()
      : fail(key, "a non-empty string");
  };

  const version = (key: string) => {
    const field = value[key];
    return typeof field === "number" ? String(field) : text(key);
  };

  const list = (key: string) => {
    const field = value[key] ?? [];
    return Array.isArray(field) &&
      field.every((item) => typeof item === "string")
      ? (field as string[])
      : fail(key, "a list of strings");
  };

  const oneOf = <Option extends string>(
    key: string,
    options: readonly Option[],
  ) => {
    const field = text(key);
    return options.includes(field as Option)
      ? (field as Option)
      : fail(key, `one of ${options.join(", ")}`);
  };

  const color = (key: string) => {
    const field = text(key);
    return HEX_COLOR.test(field) ? field : fail(key, "a #rrggbb colour");
  };

  const colors = <Count extends number>(key: string, count: Count) => {
    const field = list(key);
    return field.length === count && field.every((item) => HEX_COLOR.test(item))
      ? field
      : fail(key, `${count} #rrggbb colours`);
  };

  const group = (key: string) =>
    readFrontmatter(`${source} → ${key}`, value[key]);

  return { text, version, list, oneOf, color, colors, group };
}

export type FrontmatterReader = ReturnType<typeof readFrontmatter>;
