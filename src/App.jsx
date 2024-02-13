import Router from 'shared/Router';
import './App.css';
import GlobalStyle from './GlobalStyle';
import { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setCurrentUser, setUsers } from 'store/modules/users';
import { setArticle } from 'store/modules/article';
import { setComment } from 'store/modules/comment';
import { getArticles, getComments, getUsers } from 'util/getDocs';
import { setLoading } from 'store/modules/loading';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const [users, articles, comments] = await Promise.all([getUsers(), getArticles(), getComments()]);
      dispatch(setUsers(users));
      dispatch(setArticle(articles));
      dispatch(setComment(comments));
      dispatch(setLoading(false));
    };
    fetchData();
  }, [dispatch]);

  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log('user', user);
      dispatch(setCurrentUser(user));
    });
  }, [auth, dispatch]);

  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  );
}

export default App;
