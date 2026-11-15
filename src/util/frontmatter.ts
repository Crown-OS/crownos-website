type FrontmatterRecord = Record<string, unknown>;

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

  const oneOf = <Option extends string>(
    key: string,
    options: readonly Option[],
  ) => {
    const field = text(key);
    return options.includes(field as Option)
      ? (field as Option)
      : fail(key, `one of ${options.join(", ")}`);
  };

  return { text, oneOf };
}
