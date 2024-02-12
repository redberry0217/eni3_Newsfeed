const SET_USERS = 'users/SET_USERS';

export const setUsers = (payload) => {
  return { type: SET_USERS, payload };
};

const initialState = null;

const users = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return action.payload;
    default:
      return state;
  }
};

export default users;
