import { userList } from 'static/user';
import styled from 'styled-components';

function ArticleDetail({ article }) {
  const { authorId, title, createdAt, content, code, like } = article;
  const { nickname, avatar } = userList.find((user) => user.id === authorId);

  return (
    <Article>
      <Author>
        <Avatar src={avatar} alt={nickname} />
        <NickName>{nickname}</NickName>
      </Author>
      <Title>{title}</Title>
      <time>{new Date(createdAt).toLocaleString('ko-KR', { timeZone: 'UTC' })}</time>
      <ContentWrap>
        <Content>{content}</Content>
        <pre>
          <code className="language-javascript">{code}</code>
        </pre>
      </ContentWrap>
      <span>{like}</span>
    </Article>
  );
}

const Article = styled.article`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 2rem 0;
`;

const Author = styled.div``;

const Avatar = styled.img``;

const NickName = styled.span``;

const ContentWrap = styled.div``;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
`;

const Content = styled.p``;

export default ArticleDetail;
