import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from 'shared/firebase';
import { delComment, modComment } from 'store/modules/comment';
import styled from 'styled-components';
import { dateFormat } from 'util/date';
import { deleteComment, updateComment } from 'util/getDocs';
import { getAnimalIconUrl } from 'util/avatar';

function Comment({ comment }) {
  const dispatch = useDispatch();
  const { id, userId, content, createdAt } = comment;

  const [editComment, setEditComment] = useState({ content: content, mode: false });
  const userList = useSelector((state) => state.users);
  console.log(userList);
  const { nickname, avatar, token } = userList.users.find((user) => user.id === userId);

  const onChangeHandler = (e) => {
    setEditComment({ content: e.target.value, mode: true });
  };

  const modBtnHandler = () => {
    setEditComment({ content, mode: !editComment.mode });
    if (editComment.mode === true && !window.confirm('수정하시겠습니까?')) return;
    dispatch(modComment({ ...comment, content: editComment.content }));
    updateComment(id, { ...comment, content: editComment.content });
  };

  const delBtnHandler = () => {
    if (!window.confirm('댓글을 삭제하시겠습니까?')) return;
    dispatch(delComment(id));
    deleteComment(id);
  };

  return (
    <CommentWrap>
      <CommentHead>
        <Avatar src={getAnimalIconUrl(avatar, token)} alt={nickname} />
        <span>{nickname}</span>
        <time>{dateFormat(createdAt)}</time>
        {auth.currentUser?.uid && userId === auth.currentUser?.uid ? (
          <>
            <Button type="button" onClick={modBtnHandler}>
              {editComment.mode ? '수정 완료' : '수정'}
            </Button>
            <Button type="button" onClick={delBtnHandler}>
              삭제
            </Button>
          </>
        ) : null}
      </CommentHead>
      {editComment.mode ? (
        <TextArea value={editComment.content} onChange={onChangeHandler} />
      ) : (
        <Content>{content}</Content>
      )}
    </CommentWrap>
  );
}

function CommentList({ comments }) {
  return (
    <section>
      <CommentsWrap>
        {comments.map((comment) => {
          return <Comment comment={comment} key={comment.id} />;
        })}
      </CommentsWrap>
    </section>
  );
}

const CommentsWrap = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CommentWrap = styled.li`
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 10px;
`;

const CommentHead = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  time {
    margin-left: auto;
    font-size: 90%;
    color: #666;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 0.5rem;
  overflow: none;
  min-height: 100px;
  margin: 0.5rem 0;
`;

const Content = styled.p`
  margin: 0.5rem 0;
`;

const Avatar = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
`;

const Button = styled.button`
  border: none;
  padding: 0.2rem 0.4rem;
  border-radius: 10px;

  &:hover {
    background-color: #2f89d1;
    color: white;
    transition: all 0.1s ease;
  }
`;

export default CommentList;
