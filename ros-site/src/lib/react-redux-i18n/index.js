import I18n  from 'lib/react-i18nify/I18n.js';

export { I18n };

export {
  SET_LOCALE,
  LOAD_TRANSLATIONS,
  setLocale,
  loadTranslations,
} from './actions';

export { default as i18nReducer } from './reducer';

export function syncTranslationWithStore(store) {
  I18n.setTranslationsGetter(() => {
    try {
      return store.getState().i18n.translations;
    } catch (e) {
      console.error('Error getting translations from store!');
    }
  });
  I18n.setLocaleGetter(() => {
    try {
      return store.getState().i18n.locale;
    } catch (e) {
      console.error('Error getting locale from store!');
    }
  });
}
