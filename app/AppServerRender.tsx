import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import { createStore } from 'redux';

import { AppComponent } from './AppComponent';
import { AppTemplate } from './AppTemplate';
import { appRootReducer } from './reducers'

export function appServerRender(url: string): string {
    const store = createStore(appRootReducer);

    const state = store.getState();
const a = 123445;
const b = 11578;
    const content = ReactDOMServer.renderToString(
        <AppComponent target='server' store={store} url={url} />
    );

    const page = ReactDOMServer.renderToString(
        <AppTemplate state={state} content={'<!DOCTYPE html>\r\n' + content} />
    );

    return page;
}
