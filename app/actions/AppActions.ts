export class AppActions {
    static INIT_CONFIG = 'INIT_CONFIG';
    static IS_BROWSER = 'IS_BROWSER';
    static SET_COUNTRIES = 'SET_COUNTRIES';
    static SET_CATEGORIES = 'SET_CATEGORIES';

    static setConfig = (config) => ({ type: AppActions.INIT_CONFIG, payload: config });
    static isBrowser = (bool) => ({ type: AppActions.IS_BROWSER, payload: bool });
    static setCountries = (countries) => ({ type: AppActions.SET_COUNTRIES, payload: countries });
    static setCategories = (categories) => ({ type: AppActions.SET_CATEGORIES, payload: categories });
}
