import { collection, getDocs } from 'firebase/firestore';
import { db } from 'shared/firebase';

const SET_USERS = 'users/SET_USERS';

export const setUsers = (payload) => {
  return { type: SET_USERS, payload };
};

const userRef = collection(db, 'users');
const userSnapshot = await getDocs(userRef);
let usersList = [];
userSnapshot.forEach((doc) => {
  usersList.push({ id: doc.id, ...doc.data() });
});
const initialState = usersList;

const users = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return action.payload;
    default:
      return state;
  }
};

export default users;
