import { userList } from 'static/user';
import styled from 'styled-components';
import { dateFormat } from 'util/data';

function ArticleDetail({ article }) {
  const { authorId, title, createdAt, content, code, like } = article;
  const { nickname, avatar } = userList.find((user) => user.id === authorId);

  return (
    <>
      <Article>
        <Title>{title}</Title>
        <Author>
          <Avatar src={avatar} alt={nickname} />
          <NickName>{nickname}</NickName>
          <time>{dateFormat(createdAt)}</time>
        </Author>
        <ContentWrap>
          <Content>{content}</Content>
          <Pre>
            <code className="language-javascript">{code}</code>
          </Pre>
        </ContentWrap>
        <LikeButton type="button">❤️ {like}</LikeButton>
      </Article>
    </>
  );
}

const Article = styled.article`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 2rem 0;
`;

const Author = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Avatar = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
`;

const NickName = styled.span``;

const ContentWrap = styled.div``;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
`;

const Content = styled.p``;

const Pre = styled.pre`
  border-radius: 10px;
`;

const LikeButton = styled.button`
  border: 1px solid #ddd;
  border-radius: 10px;
  background: #fff;
  padding: 0.5rem 1rem;
  font-size: 100%;
`;

export default ArticleDetail;
