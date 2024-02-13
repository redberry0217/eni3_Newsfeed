import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { dateFormat } from 'util/date';
import { getAnimalIconUrl } from 'util/avatar';
import { FcComments, FcLike } from 'react-icons/fc';
import { FaCalendarAlt } from 'react-icons/fa';

function ArticleItem({ article }) {
  const navigate = useNavigate();
  const { id, userId, title, createdAt, content, liked } = article;
  const userList = useSelector((state) => state.users);
  const commnentList = useSelector((state) => state.comment);
  const { nickname, avatar, token } = userList.users.find((user) => user.id === userId);

  const onClickHandler = () => {
    navigate(`/detail/${id}`);
  };

  const countComment = commnentList.filter((comment) => comment.articleId === id).length;
  console.log(countComment);

  return (
    <Article onClick={onClickHandler}>
      <Author>
        <Avatar src={getAnimalIconUrl(avatar, token)} alt={nickname} />
        <NickName>{nickname}</NickName>
      </Author>
      <ContentWrap>
        <Title>{title}</Title>
        <Content>{content}</Content>
        <Bottom>
          <time>
            <FaCalendarAlt />
            {dateFormat(createdAt)}
          </time>
          <CommentIcon>
            <FcComments />
            {countComment}
          </CommentIcon>
          <LikeIcon>
            <FcLike />
            {liked?.length}
          </LikeIcon>
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
  gap: 2rem;
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
  gap: 1rem;
  margin-top: auto;

  time {
    display: flex;
    align-items: center;
    font-size: 90%;
    color: #666;
  }

  svg {
    margin-right: 0.5rem;
  }
`;

const CommentIcon = styled.span`
  margin-left: auto;

  svg {
    margin-bottom: -1px;
    margin-right: 0.3rem;
  }
`;

const LikeIcon = styled.span`
  svg {
    margin-bottom: -1px;
    margin-right: 0.3rem;
  }
`;

const Content = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default ArticleList;
