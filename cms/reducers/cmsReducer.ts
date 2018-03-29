import { LOCATION_CHANGE } from 'react-router-redux';
import { CmsActions } from '../actions';
import { CmsState } from '../common';

const initialState: CmsState = {
    config: null,
    isBrowser: false,
    user: null,
    location: {},
    countries: []
}

export function cmsReducer(state: CmsState = initialState, action) {
    switch (action.type) {
        case LOCATION_CHANGE: {
            return Object.assign({}, state, {location: action.payload});
        }
        case CmsActions.INIT_CONFIG: {
            return Object.assign({}, state, {config: action.config});
        }
        case CmsActions.IS_BROWSER: {
            return Object.assign({}, state, {isBrowser: action.bool});
        }
        case CmsActions.SET_COUNTRIES: {
            return Object.assign({}, state, {countries: action.countries});
        }
        default: {
            return state;
        }
    }
}
