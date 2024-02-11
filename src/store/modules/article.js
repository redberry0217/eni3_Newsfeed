import { articleList } from 'static/data';

const SET_ARTICLE = 'articles/SET_ARTICLE';
const ADD_ARTICLE = 'articles/ADD_ARTICLE';
const DEL_ARTICLE = 'articles/DEL_ARTICLE';
const MOD_ARTICLE = 'articles/MOD_ARTICLE';

export const setArticle = (payload) => {
  return { type: SET_ARTICLE, payload };
};

export const addArticle = (payload) => {
  return { type: ADD_ARTICLE, payload };
};

export const modArticle = (payload) => {
  return { type: MOD_ARTICLE, payload };
};

export const delArticle = (payload) => {
  return { type: DEL_ARTICLE, payload };
};

const initialState = articleList;

const article = (state = initialState, action) => {
  switch (action.type) {
    case SET_ARTICLE:
      return action.payload;
    case ADD_ARTICLE:
      return [...state, action.payload];
    case DEL_ARTICLE:
      return state.filter((article) => article.id !== action.payload);
    case MOD_ARTICLE:
      return state.map((article) => (article.id === action.payload.id ? action.payload : article));
    default:
      return state;
  }
};

export default article;
