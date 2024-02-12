import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import article from 'store/modules/article';
import comment from 'store/modules/comment';
import loginAccess from 'store/modules/loginAccess';
import stateOptions from 'store/modules/stateOptions';
import iconOptions from 'store/modules/iconOptions';

const rootReducer = combineReducers({ article, comment, loginAccess, stateOptions, iconOptions });
const store = createStore(rootReducer, composeWithDevTools());

export default store;
