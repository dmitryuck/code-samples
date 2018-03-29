import { LOCATION_CHANGE } from 'react-router-redux';
import { AppActions } from '../actions';
import { AppState } from '../common';

const initialState: AppState = {
    location: {},
    config: null,
    isBrowser: false,
    countries: [],
    categories: []
}

export function appReducer(state: AppState = initialState, action) {
    switch (action.type) {
        case LOCATION_CHANGE: {
            return Object.assign({}, state, {location: action.payload});
        }
        case AppActions.INIT_CONFIG: {
            return Object.assign({}, state, {config: action.payload});
        }
        case AppActions.IS_BROWSER: {
            return Object.assign({}, state, {isBrowser: action.payload});
        }
        case AppActions.SET_COUNTRIES: {
            return Object.assign({}, state, {countries: action.payload});
        }
        case AppActions.SET_CATEGORIES: {
            return Object.assign({}, state, {categories: action.payload});
        }
        default: {
            return state;
        }
    }
}
