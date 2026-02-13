import { withTrailingSlash } from '$app/utils/url';

/** app name. */
export const APP_TITLE = 'to';

/** version of the assets. used for cache busting. */
export const ASSET_VERSION = 1744242140483;

export const APP_URL_DOMAIN = 'fatherbrennan.github.io';
export const APP_URL_PROTOCOL = 'https';
export const APP_URL_PORT = 5173;
export const APP_URL_DOMAIN_PORT = `${APP_URL_DOMAIN}${APP_URL_PORT !== undefined ? `:${APP_URL_PORT}` : ''}`;
export const APP_URL_BASE = '/to';
export const APP_URL = withTrailingSlash(APP_URL_BASE);
export const APP_URL_ABSOLUTE = withTrailingSlash(`${APP_URL_PROTOCOL}://${APP_URL_DOMAIN_PORT}${APP_URL}`);
export const APP_URL_ICONS_PARAM = 'icons';
export const APP_URL_ICONS = withTrailingSlash(`${APP_URL}${APP_URL_ICONS_PARAM}`);
export const APP_URL_ICONS_ABSOLUTE = withTrailingSlash(`${APP_URL_PROTOCOL}://${APP_URL_DOMAIN_PORT}${APP_URL_ICONS}`);

export const META_OG_IMAGE_ALT = `${APP_TITLE} logo`;
export const META_OG_IMAGE_FILENAME = '1200x300.png';
export const META_OG_IMAGE_HEIGHT = 630;
export const META_OG_IMAGE_TYPE = 'image/png';
export const META_OG_IMAGE_WIDTH = 1200;
export const META_URL_OG_IMAGE = `${APP_URL_ICONS_ABSOLUTE}${META_OG_IMAGE_FILENAME}` as const;

/** in `px`. */
export const SCREEN_SMALL_WIDTH = 640;

export const OpenGraph = {
  Description: 'description',
  Image: 'image',
  ImageAlt: 'image:alt',
  ImageHeight: 'image:height',
  ImageType: 'image:type',
  ImageWidth: 'image:width',
  Locale: 'locale',
  Title: 'title',
  Type: 'type',
  Url: 'url',
} as const;

/** used to separate the page title from the app title. */
export const titleSeparator = '·';
