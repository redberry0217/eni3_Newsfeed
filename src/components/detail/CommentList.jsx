import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { delComment, modComment } from 'store/modules/comment';
import styled from 'styled-components';
import { dateFormat } from 'util/date';
import { deleteComment, updateComment } from 'util/getDocs';

function Comment({ comment }) {
  const dispatch = useDispatch();
  const { uniqueId, userId, content, createdAt } = comment;

  const [editMode, setEditMode] = useState({ content: content, mode: false });
  const userList = useSelector((state) => state.users);
  const { nickname } = userList.find((user) => user.id === userId);

  const onChangeHandler = (e) => {
    setEditMode({ content: e.target.value, mode: true });
  };

  const modBtnHandler = () => {
    setEditMode({ content, mode: !editMode.mode });
    if (editMode.mode === true && !window.confirm('수정하시겠습니까?')) return;
    dispatch(modComment({ ...comment, content: editMode.content }));
    updateComment(uniqueId, { ...comment, content: editMode.content });
  };

  const delBtnHandler = () => {
    if (!window.confirm('댓글을 삭제하시겠습니까?')) return;
    dispatch(delComment(uniqueId));
    deleteComment(uniqueId);
  };

  return (
    <CommentWrap>
      <CommentHead>
        {/* <Avatar src={avatar} alt={nickname} /> */}
        <span>{nickname}</span>
        <time>{dateFormat(createdAt)}</time>
      </CommentHead>
      {editMode.mode ? <textarea value={editMode.content} onChange={onChangeHandler} /> : <p>{content}</p>}
      <button type="button" onClick={modBtnHandler}>
        {editMode.mode ? '수정 완료' : '수정'}
      </button>
      <button type="button" onClick={delBtnHandler}>
        삭제
      </button>
    </CommentWrap>
  );
}

function CommentList({ comments }) {
  return (
    <section>
      <CommentsWrap>
        {comments.map((comment) => {
          return <Comment comment={comment} key={comment.uniqueId} />;
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
  margin-bottom: 1rem;

  time {
    margin-left: auto;
  }
`;

const Avatar = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
`;

export default CommentList;
