import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import { createStore } from 'redux';

import { CmsComponent } from './CmsComponent';
import { CmsTemplate } from './CmsTemplate';
import { cmsRootReducer } from './reducers';

export function cmsServerRender(url: string): string {
    const store = createStore(cmsRootReducer);

    const state = store.getState();

    const content = ReactDOMServer.renderToString(
        <CmsComponent target='server' store={store} url={url} />
    );

    const page = ReactDOMServer.renderToString(
        <CmsTemplate state={state} content={'<!DOCTYPE html>\r\n' + content} />
    );

    return page;
}
