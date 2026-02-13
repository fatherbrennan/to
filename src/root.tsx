import { RouterHead } from '$app/components';
import { APP_TITLE, APP_URL_ABSOLUTE } from '$app/constants';
import { v } from '$app/utils/url';
import { component$ } from '@builder.io/qwik';
import { QwikCityProvider, RouterOutlet, ServiceWorkerRegister } from '@builder.io/qwik-city';
import './index.css';

export const Root = component$(() => {
  /**
   * the root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * do not remove the `<head>` and `<body>` elements.
   */

  return (
    <QwikCityProvider>
      <head>
        <meta charset='utf-8' />
        <meta content='@fatherbrennan' name='author' />
        <meta content='noindex, nofollow' name='robots' />
        <meta
          content='width=device-width,initial-scale=1.0,maximum-scale=1.0,viewport-fit=cover,user-scalable=no'
          name='viewport'
        />
        <meta content='yes' name='mobile-web-app-capable' />
        <meta content={APP_TITLE} name='apple-mobile-web-app-title' />
        <meta content='yes' name='apple-mobile-web-app-capable' />
        <meta content='black-translucent' name='apple-mobile-web-app-status-bar-style' />
        <link href={v(`${APP_URL_ABSOLUTE}manifest.json`)} rel='manifest' />
        <link href={v(`${APP_URL_ABSOLUTE}favicon.png`)} rel='icon' sizes='96x96' type='image/png' />
        <link href={v(`${APP_URL_ABSOLUTE}favicon.ico`)} rel='icon' sizes='48x48' />
        <link href={v(`${APP_URL_ABSOLUTE}favicon.svg`)} rel='icon' sizes='any' type='image/svg+xml' />
        <link href={v(`${APP_URL_ABSOLUTE}apple-touch-icon.png`)} rel='apple-touch-icon' sizes='180x180' />

        <RouterHead />
      </head>
      <body class='flex flex-col font-mono' lang='en'>
        <RouterOutlet />
        <ServiceWorkerRegister />
      </body>
    </QwikCityProvider>
  );
});
