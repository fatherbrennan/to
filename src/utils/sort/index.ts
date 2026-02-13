export const sortAscString = <T extends string[]>(a: T[number], b: T[number]) => {
  return a.localeCompare(b);
};
