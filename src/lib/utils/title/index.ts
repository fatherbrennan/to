import { APP_NAME, titleSeparator } from '$lib/constants';

export const withAppTitle = <T extends string>(title: T) => {
  return `${title} ${titleSeparator} ${APP_NAME}` as const;
};

export const getToHead = <T extends string>(title: T) => {
  const t = `${APP_NAME} ${title}` as const;
  return { description: `${t}.`, title: t } as const;
};
