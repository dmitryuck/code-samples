import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { cmsReducer } from './cmsReducer';
import { categoryReducer } from './categoryReducer';
// import { authReducer } from './authReducer';

export const cmsRootReducer = combineReducers({
    router: routerReducer,
    cmsState: cmsReducer,
    // authState: authReducer,
    categoryState: categoryReducer
});
