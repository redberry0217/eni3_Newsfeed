export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const login = (payload) => ({
  type: LOGIN,
  payload
});

export const logout = () => ({
  type: LOGOUT
});

const initialState = {
  user: null
};

const loginAccess = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.payload
      };
    case LOGOUT:
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
};

export default loginAccess;
