import { useNavigate } from 'react-router-dom';
import { userList } from 'static/user';
import styled from 'styled-components';
import { dateFormat } from 'util/data';

function ArticleItem({ article }) {
  const navigate = useNavigate();
  const { id, authorId, title, createdAt, content, like } = article;
  const { nickname, avatar } = userList.find((user) => user.id === authorId);

  const onClickHandler = () => {
    navigate(`/detail/${id}`);
  };

  return (
    <Article onClick={onClickHandler}>
      <Author>
        <Avatar src={avatar} alt={nickname} />
        <NickName>{nickname}</NickName>
      </Author>
      <ContentWrap>
        <Title>{title}</Title>
        <Content>{content}</Content>
        <Bottom>
          <time>{dateFormat(createdAt)}</time>
          <span>{like}</span>
        </Bottom>
      </ContentWrap>
    </Article>
  );
}

function ArticleList({ list }) {
  return (
    <Section>
      {list.map((article) => {
        return <ArticleItem key={article.id} article={article} />;
      })}
    </Section>
  );
}

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem;
`;

const Article = styled.article`
  display: flex;
  gap: 1rem;
  padding: 2rem;
  background-color: #f2f2f2;
  border-radius: 10px;
  cursor: pointer;
`;

const Title = styled.h2`
  font-size: 1.3rem;
  font-weight: bold;
`;

const Author = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const Avatar = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
`;

const NickName = styled.span`
  font-weight: bold;
`;

const ContentWrap = styled.div`
  flex: 1 1 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: auto;
`;

const Content = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default ArticleList;
