import { getRequest, ServerApi } from '../../glob';

export class AppThunks {
    static getCountries() {
        return (dispatch, getState) => {
            const state = getState().appState;

            if (state.counties) {
                // return Promise.resolve();
            }

            return getRequest(ServerApi.COUNTRIES);
        }
    }

    static getCategories() {
        return (dispatch, getState) => {
            const state = getState().appState;

            if (state.categories) {
                // return Promise.resolve();
            }

            return getRequest(ServerApi.CATEGORIES);
        }
    }
}
