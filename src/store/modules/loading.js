const SET_LOADING = 'loading/SET_LOADING';

export const setLoading = (payload) => {
  return { type: SET_LOADING, payload };
};

const initialState = true;

const loading = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return action.payload;
    default:
      return state;
  }
};

export default loading;
