const SET_COMMENT = 'comment/SET_COMMENT';
const ADD_COMMENT = 'comment/ADD_COMMENT';
const DEL_COMMENT = 'comment/DEL_COMMENT';
const MOD_COMMENT = 'comment/MOD_COMMENT';

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
  return { type: DEL_COMMENT, payload };
};

const initialState = [];

const comment = (state = initialState, action) => {
  switch (action.type) {
    case SET_COMMENT:
      return action.payload;
    case ADD_COMMENT:
      return [...state, action.payload];
    case DEL_COMMENT:
      return state.filter((comment) => comment.uniqueId !== action.payload);
    case MOD_COMMENT:
      return state.map((comment) => (comment.uniqueId === action.payload.uniqueId ? action.payload : comment));
    default:
      return state;
  }
};

export default comment;
