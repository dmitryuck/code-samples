export class CmsActions {
  static INIT_CONFIG = 'INIT_CONFIG';
  static IS_BROWSER = 'IS_BROWSER';
  static SET_USER = 'SET_USER';
  static SET_COUNTRIES = 'SET_COUNTRIES';

  static setConfig = (config) => ({ type: CmsActions.INIT_CONFIG, config });
  static isBrowser = (bool) => ({ type: CmsActions.IS_BROWSER, bool });
  static setUser = (user) => ({ type: CmsActions.SET_USER, user });
  static setCountries = (countries) => ({ type: CmsActions.SET_COUNTRIES, countries });
}
