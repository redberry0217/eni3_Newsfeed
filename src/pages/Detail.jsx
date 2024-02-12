import ArticleDetail from 'components/detail/ArticleDetail';
import CommentList from 'components/detail/CommentList';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CommentForm from 'components/detail/CommentForm';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { fetchArticle, fetchUsers } from 'util/fetch';
import { setUsers } from 'store/modules/users';
import { setArticle } from 'store/modules/article';

function Detail() {
  const { id } = useParams();
  const articles = useSelector((state) => state.article);
  const allComments = useSelector((state) => state.comment);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchUsers().then((data) => dispatch(setUsers(data)));
    fetchArticle().then((data) => dispatch(setArticle(data)));
  }, [dispatch]);

  const article = articles.find((article) => article.id === id);
  const comments = allComments.filter((comment) => comment.articleId === id);

  if (!article) return null;

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
