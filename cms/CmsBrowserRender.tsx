import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { routerMiddleware, ConnectedRouter } from 'react-router-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { isBrowser } from '../glob';
import { CmsComponent } from './CmsComponent';
import { cmsRootReducer } from './reducers';

// This script will run in the browser and will render our component using the
// value from APP_PROPS that we generate inline in the page's html on the server.
// If these props match what is used in the server render, React will see that
// it doesn't need to generate any DOM and the page will load faster
if (isBrowser) {
    window.onload = () => {
        const state = window['__PRELOADED_STATE__'];

        delete window['__PRELOADED_STATE__'];

        const browserHistory = createBrowserHistory();

        const middleware = routerMiddleware(browserHistory);

        const store = createStore(cmsRootReducer, state, applyMiddleware(middleware, thunk));

        const AppFactory = React.createFactory(() =>
            <CmsComponent target='browser' store={store} history={browserHistory} />
        );

        ReactDOM.render(AppFactory(), document.getElementById('content'));
    }
}
