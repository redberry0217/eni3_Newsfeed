import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import article from 'store/modules/article';
import comment from 'store/modules/comment';
import stateOptions from 'store/modules/stateOptions';
import users from 'store/modules/users';
import iconOptions from 'store/modules/iconOptions';
import loading from 'store/modules/loading';

const rootReducer = combineReducers({ article, comment, users, stateOptions, iconOptions, loading });

const store = createStore(rootReducer, composeWithDevTools());

export default store;
