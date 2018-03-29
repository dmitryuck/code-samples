import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { appReducer } from './appReducer';
import { authReducer } from './authReducer';

export const appRootReducer = combineReducers({
  router: routerReducer,
  appState: appReducer,
  authState: authReducer
});
