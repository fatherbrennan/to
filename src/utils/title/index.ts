import { APP_TITLE, titleSeparator } from '$app/constants';

export const withAppTitle = <T extends string>(title: T) => {
  return `${title} ${titleSeparator} ${APP_TITLE}` as const;
};
