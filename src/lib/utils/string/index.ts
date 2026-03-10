type RawLowerSnakeCase<S extends string> = S extends `${infer First}${infer Rest}`
  ? Rest extends `${infer Second}${infer Tail}`
    ? First extends Lowercase<First>
      ? Second extends Uppercase<Second>
        ? `${First}_${RawLowerSnakeCase<`${Second}${Tail}`>}`
        : `${First}${RawLowerSnakeCase<Rest>}`
      : First extends Uppercase<First>
        ? Second extends Uppercase<Second>
          ? `${Lowercase<First>}${RawLowerSnakeCase<Rest>}`
          : `_${Lowercase<First>}${RawLowerSnakeCase<Rest>}`
        : `${Lowercase<First>}${RawLowerSnakeCase<Rest>}`
    : Lowercase<S>
  : S;
type CollapseUnderscores<S extends string> = S extends `${infer Head}__${infer Tail}`
  ? CollapseUnderscores<`${Head}_${Tail}`>
  : S;
type LowerSnakeCase<S extends string> = CollapseUnderscores<RawLowerSnakeCase<S>>;

export function camelToLowerSnake<const S extends string>(value: S) {
  return value
    .replace(/([a-z0-9])([A-Z])|([A-Z])([A-Z][a-z])/g, (_, p1, p2, p3, p4) => (p1 ? `${p1}_${p2}` : `${p3}_${p4}`))
    .toLowerCase() as LowerSnakeCase<S>;
}
