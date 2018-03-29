import { AuthActions } from '../actions';
import { AuthState } from '../common';

const initialState: AuthState = {
    user: null,
    showAuth: false
}

export function authReducer(state: AuthState = initialState, action) {
    switch (action.type) {
        case AuthActions.SET_USER: {
            return Object.assign({}, state, {user: action.payload});
        }
        case AuthActions.SHOW_AUTH: {
            return Object.assign({}, state, {showAuth: action.payload});
        }
        default: {
            return state;
        }
    }
}
