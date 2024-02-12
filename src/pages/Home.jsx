import ArticleList from 'components/home/ArticleList';
import SortMenu from 'components/home/SortMenu';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setArticle } from 'store/modules/article';
import { setUsers } from 'store/modules/users';
import styled from 'styled-components';
import { getArticles, getUsers } from 'util/getDocs';

function Home() {
  const [sortMethod, setSortMethod] = useState('latest');
  const articles = useSelector((state) => state.article);

  const dispatch = useDispatch();

  useEffect(() => {
    getUsers().then((data) => dispatch(setUsers(data)));
    getArticles().then((data) => dispatch(setArticle(data)));
  }, [dispatch]);

  let list = articles;
  switch (sortMethod) {
    case 'popular':
      list = articles.sort((a, b) => b.like - a.like);
      break;
    case 'latest':
      list = articles.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      break;
    default:
      list = articles;
  }

  const changeSort = (method) => {
    setSortMethod(method);
  };

  return (
    <Container>
      <SortMenu changeSort={changeSort} />
      <ArticleList list={list} />
    </Container>
  );
}

const Container = styled.div`
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
`;

export default Home;
