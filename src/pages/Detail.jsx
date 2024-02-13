import ArticleDetail from 'components/detail/ArticleDetail';
import CommentList from 'components/detail/CommentList';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import CommentForm from 'components/detail/CommentForm';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { modArticle } from 'store/modules/article';
import { updateArticle } from 'util/getDocs';
import CodeKataForm from 'components/CodeKataForm';

function Detail() {
  const dispatch = useDispatch();

  const { id } = useParams();
  const articles = useSelector((state) => state.article);
  const allComments = useSelector((state) => state.comment);
  const [editArticle, setEditArticle] = useState(false);

  const article = articles.find((article) => article.id === id);

  const editBtnHandler = () => {
    setEditArticle((prev) => !prev);
  };

  const comments = allComments
    .filter((comment) => comment.articleId === id)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const { title, content, link, difficulty, code } = e.target;

    if (!title || !content || !link || !difficulty || !code) {
      return alert('모든 항목을 작성해주세요.');
    }

    const nextCodeKata = {
      like: 0,
      title: title.value,
      content: content.value,
      link: link.value,
      difficulty: difficulty.value,
      code: code.value
    };

    if (!window.confirm('수정하시겠습니까')) return;
    dispatch(modArticle({ ...article, ...nextCodeKata }));
    updateArticle(id, nextCodeKata);
    setEditArticle(false);
  };

  if (!article) return null;

  return (
    <Container>
      {editArticle ? (
        <CodeKataForm value={article} onSubmitHandler={onSubmitHandler} editMode={true} />
      ) : (
        <>
          <ArticleDetail article={article} editBtnHandler={editBtnHandler} />
          <CommentForm articleId={id} />
          <CommentList comments={comments} />
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
`;

export default Detail;
