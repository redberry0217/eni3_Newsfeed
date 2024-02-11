import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import article from 'store/modules/article';
import comment from 'store/modules/comment';

const rootReducer = combineReducers({ article, comment });
const store = createStore(rootReducer, composeWithDevTools());

export default store;
