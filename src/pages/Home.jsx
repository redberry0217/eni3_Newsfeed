import ArticleList from 'components/home/ArticleList';
import SortMenu from 'components/home/SortMenu';
import { useState } from 'react';
import { useSelector } from 'react-redux';

function Home() {
  const [sortMethod, setSortMethod] = useState('latest');
  const articles = useSelector((state) => state.article);

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
    <>
      <SortMenu changeSort={changeSort} />
      <ArticleList list={list} />
    </>
  );
}

export default Home;
