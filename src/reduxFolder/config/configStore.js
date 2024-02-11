import { createStore } from 'redux';
import { combineReducers } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import loginAccess from 'reduxFolder/modules/loginAccess';

const rootReducer = combineReducers({
  loginAccess: loginAccess
});

const store = createStore(rootReducer, devToolsEnhancer());

export default store;
