import { AuthActions } from '../actions';
import { getRequest, postRequest, ServerApi } from '../../glob'

export class AuthThunks {
    static isLogged() {
        return (dispatch, getState) => {
            // const state = getState().appState;
            return getRequest(ServerApi.IS_LOGGED);
        }
    }

    static localLogin(email, pass) {
        return (dispatch, getState) => {
            // const state = getState().appState;
            return postRequest(ServerApi.LOCAL_LOGIN, {email: email, password: pass});
        }
    }

    static localSignup(params) {
        return (dispatch, getState) => {
            // const state = getState().appState;
            return postRequest(ServerApi.LOCAL_SIGNUP, params);
        }
    }
}
