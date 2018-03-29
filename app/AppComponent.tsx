import React from 'react';
import { Provider, connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { appConfig } from './AppConfig';
import { isBrowser, Message, ServerResponse } from '../glob';
import { Header, Auth, Footer, Body } from './views/Shared';
import { AppActions, AuthActions } from './actions';
import { AppRootState, AppState, AuthState } from './common';
import { AppThunks, AuthThunks } from './thunks';

interface State {
}

interface Props {
    app?: AppState;
    auth?: AuthState;
    dispatch?: Function;
    store: any;
    url?: string;
    target: string;
    history?: any;
    isBrowser?: Function;
    setConfig?: Function;
    showAuth?: Function;
    isLogged?: Function;
    getCountries?: Function;
    setCountries?: Function;
}

@connect((state: AppRootState) => ({
    app: state.appState,
    auth: state.authState
}), dispatch => bindActionCreators({
    dispatch: dispatch,
    isBrowser: AppActions.isBrowser,
    setConfig: AppActions.setConfig,
    showAuth: AuthActions.showAuth,
    isLogged: AuthThunks.isLogged,
    getCountries: AppThunks.getCountries,
    setCountries: AppActions.setCountries
}, dispatch))
export class AppComponent extends React.Component<Props, State> {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (isBrowser) {
            console.log('HELLO FROM APP COMPONENT');

            this.props.setConfig(appConfig);
            this.props.isBrowser(isBrowser);

            this.props.getCountries().then((res: ServerResponse) => {
                if (res.success) {
                    this.props.setCountries(res.data);
                }
            });

            this.props.isLogged().then((res: ServerResponse) => {
                if (res.success) {
                    this.props.dispatch(AuthActions.setUser(res.data));
                    if (!res.data) {
                        this.props.showAuth(true);
                    }
                }
            });
        }
    }

    render() {
        const { store, url, target, history } = this.props;

        return(
            <Provider store={store}>
                <div>
                    <Auth />
                    <Header />
                    <Body target={target} url={url} history={history}/>
                    <Footer />
                </div>
            </Provider>
        );
    }
}
