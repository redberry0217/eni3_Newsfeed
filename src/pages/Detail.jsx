import ArticleDetail from 'components/detail/ArticleDetail';
import CommentList from 'components/detail/CommentList';
import Prism from 'prismjs';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'prism.css';
import CommentForm from 'components/detail/CommentForm';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

function Detail() {
  const { id } = useParams();
  const articles = useSelector((state) => state.article);
  const allComments = useSelector((state) => state.comment);

  const article = articles.find((article) => article.id === id);
  const comments = allComments.filter((comment) => comment.articleId === id);

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <Container>
      <ArticleDetail article={article} />
      <CommentForm articleId={id} />
      <CommentList comments={comments} />
    </Container>
  );
}

const Container = styled.div`
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
`;

export default Detail;
