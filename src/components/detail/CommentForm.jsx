import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addComment } from 'store/modules/comment';
import styled from 'styled-components';
import { createComment } from 'util/getDocs';

function CommentForm({ articleId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.users.currentUser);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (currentUser) {
      if (!window.confirm('댓글을 작성하시겠습니까?')) return;

      const newComment = {
        userId: currentUser.uid,
        articleId,
        createdAt: new Date().toISOString(),
        content: e.target.content.value
      };

      const { id } = await createComment(newComment);
      dispatch(addComment({ ...newComment, id }));
      e.target.reset();
    } else {
      alert('로그인이 필요합니다.');
      navigate('/auth');
    }
  };

  return (
    <Form onSubmit={onSubmitHandler}>
      <TextArea placeholder="질문&의견을 공유해주세요." title="comment" name="content" required />
      <Button type="submit">댓글 작성</Button>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 2rem 0;
`;

const TextArea = styled.textarea`
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 1rem;
  min-height: 100px;
  width: 100%;
  font-family: sans-serif;
`;

const Button = styled.button`
  border: none;
  margin-left: auto;
  font-size: 100%;
  padding: 0.5rem;
  border-radius: 10px;

  &:hover {
    background-color: #2f89d1;
    color: white;
    transition: all 0.1s ease;
  }
`;

export default CommentForm;
