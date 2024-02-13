const SET_USERS = 'users/SET_USERS';
const ADD_USER = 'users/ADD_USERS';
const SET_CURRENT_USER = 'users/SET_USER';

export const setCurrentUser = (payload) => {
  return { type: SET_CURRENT_USER, payload };
};

export const setUsers = (payload) => {
  return { type: SET_USERS, payload };
};

export const addUser = (payload) => {
  console.log(payload);
  return { type: ADD_USER, payload };
};

const initialState = {
  currentUser: null,
  users: []
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { ...state, currentUser: action.payload };
    case SET_USERS:
      return { ...state, users: action.payload };
    case ADD_USER:
      return { ...state, users: [...state.users, action.payload] };
    default:
      return state;
  }
};

export default users;
