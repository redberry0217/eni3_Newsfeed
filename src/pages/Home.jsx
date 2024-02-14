import ArticleList from 'components/home/ArticleList';
import SortMenu from 'components/home/SortMenu';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

function Home() {
  const [sortMethod, setSortMethod] = useState('latest');
  const articles = useSelector((state) => state.article);

  let list = articles;
  switch (sortMethod) {
    case 'popular':
      list = articles.sort((a, b) => b.liked.length - a.liked.length);
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
  padding: 1rem 1.5rem;
`;

export default Home;
