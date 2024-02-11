import ArticleDetail from 'components/detail/ArticleDetail';
import CommentList from 'components/detail/CommentList';
import Prism from 'prismjs';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'prism.css';
import CommentForm from 'components/detail/CommentForm';
import { useSelector } from 'react-redux';

function Detail() {
  const { id } = useParams();
  const articles = useSelector((state) => state.article);
  const allComments = useSelector((state) => state.comment);

  const article = articles.find((article) => article.id === parseInt(id));
  const comments = allComments.filter((comment) => comment.articleId === parseInt(id));

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <>
      <ArticleDetail article={article} />
      <CommentForm articleId={id} />
      <CommentList comments={comments} />
    </>
  );
}

export default Detail;
