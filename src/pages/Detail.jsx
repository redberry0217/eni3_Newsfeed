import ArticleDetail from 'components/detail/ArticleDetail';
import CommentList from 'components/detail/CommentList';
import Prism from 'prismjs';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { commentList } from 'static/comment';
import { articleList } from 'static/data';
import 'prism.css';
import CommentForm from 'components/detail/CommentForm';

function Detail() {
  const { id } = useParams();
  const article = articleList.find((article) => article.id === parseInt(id));
  const comments = commentList.filter((comment) => comment.articleId === parseInt(id));

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <>
      <ArticleDetail article={article} />
      <CommentForm />
      <CommentList comments={comments} />
    </>
  );
}

export default Detail;
