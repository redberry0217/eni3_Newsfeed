import ArticleDetail from 'components/detail/ArticleDetail';
import { useParams } from 'react-router-dom';
import { articleList } from 'static/data';

function Detail() {
  const { id } = useParams();
  const article = articleList.find((article) => article.id === parseInt(id));

  return (
    <>
      <ArticleDetail article={article} />
    </>
  );
}

export default Detail;
