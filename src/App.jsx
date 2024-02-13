import Router from 'shared/Router';
import './App.css';
import GlobalStyle from './GlobalStyle';
import { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { auth } from './shared/firebase';
import { useDispatch } from 'react-redux';
import store from 'store/config/configStore';
import { login, logout } from 'store/modules/loginAccess';
import { setUsers } from 'store/modules/users';
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

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        store.dispatch(login(user));
      } else {
        store.dispatch(logout());
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log('user', user); // 사용자 인증 정보가 변경될 때마다 해당 이벤트를 받아 처리합니다. 로그인 로그아웃 확인
    });
  }, []);

  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  );
}

export default App;
