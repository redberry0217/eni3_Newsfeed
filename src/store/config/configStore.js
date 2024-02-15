import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import article from 'store/modules/article';
import comment from 'store/modules/comment';
import users from 'store/modules/users';
import loading from 'store/modules/loading';

const rootReducer = combineReducers({ article, comment, users, loading });

const store = createStore(rootReducer, composeWithDevTools());

export default store;
