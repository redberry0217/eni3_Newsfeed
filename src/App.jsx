import Router from 'shared/Router';
import './App.css';
import GlobalStyle from './GlobalStyle';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './shared/firebase';
import { useDispatch } from 'react-redux';
import { setUser, setUsers } from 'store/modules/users';
import { setArticle } from 'store/modules/article';
import { setComment } from 'store/modules/comment';
import { getArticles, getComments, getUsers } from 'util/getDocs';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    getUsers().then((data) => dispatch(setUsers(data)));
    getArticles().then((data) => dispatch(setArticle(data)));
    getComments().then((data) => dispatch(setComment(data)));
  }, [dispatch]);

  // const auth = getAuth();

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       store.dispatch(login(user));
  //     } else {
  //       store.dispatch(logout());
  //     }
  //   });
  //   return () => unsubscribe();
  // }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log('홈user', user);
      dispatch(setUser(user));
    });
  }, [dispatch]);

  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  );
}

export default App;
