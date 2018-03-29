import { CategoryActions } from '../actions';
import { CategoryState } from '../common';

const initialState: CategoryState = {
    categories: []
}

export function categoryReducer(state: CategoryState = initialState, action) {
    switch (action.type) {
        case CategoryActions.SET_CATEGORIES: {
            return Object.assign({}, state, {categories: action.payload});
        }
        default: {
            return state;
        }
    }
}
