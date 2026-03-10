import { SCREEN_SMALL_WIDTH } from '$lib/constants';
import { iniContext } from '$lib/utils/context';
import type { GetContent } from '$lib/utils/url';

type AppContext = {
  content: GetContent | null;
  isSmallDisplay: boolean;
};

const {
  upd: _upd,
  ini: iniApp,
  get: getApp,
  set: setApp,
} = iniContext<AppContext>({
  content: null,
  isSmallDisplay: true,
});

const updAppWidth = <T extends number>(width: T) => {
  const v = getApp();
  v.isSmallDisplay = width <= SCREEN_SMALL_WIDTH;
  setApp(v);
};

export { getApp, iniApp, setApp, updAppWidth };
