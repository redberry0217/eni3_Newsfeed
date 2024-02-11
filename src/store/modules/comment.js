import { commentList } from 'static/comment';

const SET_COMMENT = 'articles/SET_COMMENT';
const ADD_COMMENT = 'articles/ADD_COMMENT';
const DEL_COMMENT = 'articles/DEL_COMMENT';
const MOD_COMMENT = 'articles/MOD_COMMENT';

export const setComment = (payload) => {
  return { type: SET_COMMENT, payload };
};

export const addComment = (payload) => {
  return { type: ADD_COMMENT, payload };
};

export const modComment = (payload) => {
  return { type: MOD_COMMENT, payload };
};

export const delComment = (payload) => {
  console.log(payload);
  return { type: DEL_COMMENT, payload };
};

const initialState = commentList;

const comment = (state = initialState, action) => {
  switch (action.type) {
    case SET_COMMENT:
      return action.payload;
    case ADD_COMMENT:
      return [...state, action.payload];
    case DEL_COMMENT:
      return state.filter((comment) => comment.id !== action.payload);
    case MOD_COMMENT:
      return state.map((comment) => (comment.id === action.payload.id ? action.payload : comment));
    default:
      return state;
  }
};

export default comment;
