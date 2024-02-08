import { userList } from 'static/user';
import styled from 'styled-components';

function Comment({ comment }) {
  const { userId, content, createdAt } = comment;
  const { nickname, avatar } = userList.find((user) => user.id === userId);
  return (
    <CommentWrap>
      <CommentHead>
        <Avatar src={avatar} alt={nickname} />
        <span>{nickname}</span>
        <time>{createdAt}</time>
      </CommentHead>
      <p>{content}</p>
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
  background: #f2f2f2;
  padding: 1rem;
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
