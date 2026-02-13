import { APP_TITLE, titleSeparator } from '$app/constants';

export const withAppTitle = <T extends string>(title: T) => {
  return `${title} ${titleSeparator} ${APP_TITLE}` as const;
};

export const getToHead = <T extends string>(title: T) => {
  const t = `${APP_TITLE} ${title}` as const;
  return { description: `${t}.`, title: t } as const;
};
