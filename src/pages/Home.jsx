import ArticleList from 'components/home/ArticleList';
import SortMenu from 'components/home/SortMenu';
import { useState } from 'react';
import { articleList } from 'static/data';

function Home() {
  const [sortMethod, setSortMethod] = useState('latest');

  let list;
  switch (sortMethod) {
    case 'popular':
      list = articleList.sort((a, b) => b.like - a.like);
      break;
    case 'latest':
      list = articleList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      break;
    default:
      list = articleList;
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
