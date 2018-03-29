export class AuthActions {
    static SET_USER = 'SET_USER';
    static SHOW_AUTH = 'SHOW_AUTH';
    static LOCAL_LOGIN = 'LOCAL_LOGIN';

    static setUser = (user) => ({ type: AuthActions.SET_USER, payload: user });
    static showAuth = (bool) => ({ type: AuthActions.SHOW_AUTH, payload: bool });
    static localLogin = (email, pass) => ({ type: AuthActions.LOCAL_LOGIN, payload: {email, pass} });
}
