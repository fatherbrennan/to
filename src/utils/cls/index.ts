export const cls = (...args: (string | boolean | undefined | null)[]): string => {
  let classes = '';
  for (let i = 0; i < args.length; i++) {
    const potentialClass = args[i];
    if (potentialClass) {
      classes += `${potentialClass} `;
    }
  }
  return classes.slice(0, -1);
};
