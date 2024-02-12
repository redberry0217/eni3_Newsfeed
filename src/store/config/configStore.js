import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import article from 'store/modules/article';
import comment from 'store/modules/comment';
import loginAccess from 'store/modules/loginAccess';

const rootReducer = combineReducers({ article, comment, loginAccess });
const store = createStore(rootReducer, composeWithDevTools());

export default store;
