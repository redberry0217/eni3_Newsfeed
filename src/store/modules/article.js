const SET_ARTICLE = 'articles/SET_ARTICLE';
const ADD_ARTICLE = 'articles/ADD_ARTICLE';
const DEL_ARTICLE = 'articles/DEL_ARTICLE';
const MOD_ARTICLE = 'articles/MOD_ARTICLE';
const LIKE_ARTICLE = 'articles/LIKE_ARTICLE';

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

export const likeArticle = (payload) => {
  return { type: LIKE_ARTICLE, payload };
};

const initialState = [];

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
    case LIKE_ARTICLE:
      return state.map((article) => {
        if (article.id === action.payload.id) {
          if (article.liked.includes(action.payload.currentUserId)) {
            const updatedLiked = article.liked.filter((item) => item !== action.payload.currentUserId);
            return { ...article, liked: updatedLiked };
          } else {
            return { ...article, liked: [...article.liked, action.payload.currentUserId] };
          }
        }
        return article;
      });
    default:
      return state;
  }
};

export default article;
