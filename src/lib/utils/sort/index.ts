export const sortStringAsc = <T extends string[]>(a: T[number], b: T[number]) => {
  return a.localeCompare(b);
};
