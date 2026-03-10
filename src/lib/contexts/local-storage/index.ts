import type { LanguageCode, LanguageCodeI18n, TimeZone } from '$lib/types';
import { iniContext } from '$lib/utils/context';
import { tryCatch } from '$lib/utils/try-catch';

type LocalStorageContext = {
  local: {
    languageCode: LanguageCode;
    languageCodeI18n: LanguageCodeI18n;
    timeZone: TimeZone;
  };
};

export const localStorageKey = 'app.local';
const {
  upd,
  ini: iniLocalStorage,
  get: getLocalStorage,
  set: setLocalStorage,
} = iniContext<LocalStorageContext>({
  local: {
    languageCode: 'en-AU',
    languageCodeI18n: 'en_AU',
    timeZone: 'Australia/Adelaide',
  },
});

const updLocalStorage = upd((v, newValue) => {
  v.local.languageCode = newValue.local.languageCode;
  v.local.languageCodeI18n = newValue.local.languageCodeI18n;
  v.local.timeZone = newValue.local.timeZone;
});

/** complete update of local storage context, and write to local storage. */
const wLocalStorage = upd((_v, newValue) => {
  // set updated value, otherwise fallback to default.
  const json = tryCatch(
    () => JSON.stringify(newValue),
    () => JSON.stringify(iniLocalStorage()),
  );
  updLocalStorage(JSON.parse(json));
  window.localStorage.setItem(localStorageKey, json);
});

/** read local storage, and update local storage context using as many values from local storage as possible. */
const rwLocalStorage = () => {
  const localStorageString = window.localStorage.getItem(localStorageKey);

  // keep defaults.
  if (localStorageString === '' || localStorageString === null) {
    updLocalStorage(iniLocalStorage());
    return;
  }

  const localStorage = tryCatch(() => {
    const local = JSON.parse(localStorageString) as Partial<LocalStorageContext>;
    const defaultValue = iniLocalStorage();
    const v = structuredClone(defaultValue);
    v.local.languageCode = local.local?.languageCode ?? defaultValue.local.languageCode;
    v.local.languageCodeI18n = local.local?.languageCodeI18n ?? defaultValue.local.languageCodeI18n;
    v.local.timeZone = local.local?.timeZone ?? defaultValue.local.timeZone;
    return v;
  }, iniLocalStorage);

  wLocalStorage(localStorage);
};

export { getLocalStorage, iniLocalStorage, rwLocalStorage, setLocalStorage, wLocalStorage };
