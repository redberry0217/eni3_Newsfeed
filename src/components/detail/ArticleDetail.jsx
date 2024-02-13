import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { likeArticle } from 'store/modules/article';
import styled from 'styled-components';
import { dateFormat } from 'util/date';
import Prism from 'prismjs';
import 'prism.css';

function ArticleDetail({ article, editBtnHandler }) {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.users);
  const { id, userId, title, createdAt, content, code, like, link, difficulty } = article;
  const { nickname, avatar } = userList.find((user) => user.id === userId);

  const onClickHandler = () => {
    dispatch(likeArticle(id));
  };

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <>
      <Article>
        <Title>{title}</Title>
        <Author>
          <Avatar src={avatar} alt={nickname} />
          <NickName>{nickname}</NickName>
          <time>{dateFormat(createdAt)}</time>
          <button onClick={editBtnHandler}>수정</button>
          <button>삭제</button>
        </Author>
        <ContentWrap>
          <Pre>
            <code className="language-javascript">{code}</code>
          </Pre>
          <Content>{content}</Content>
          <div>문제 난이도 : {difficulty}</div>
          <CodeLink href={link} target="_blank" rel="noreferrer">
            문제풀이 링크
          </CodeLink>
        </ContentWrap>
        <LikeButton type="button" onClick={onClickHandler}>
          ❤️ {like}
        </LikeButton>
      </Article>
    </>
  );
}

const Article = styled.article`
  margin: 2rem 0;
`;

const Author = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0;
  gap: 0.5rem;
`;

const Avatar = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
`;

const NickName = styled.span``;

const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem 0;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
`;

const Content = styled.p``;

const CodeLink = styled.a`
  display: inline-block;
  padding: 0.5rem;
  background: #2f89d1;
  border-radius: 10px;
  text-align: center;
  width: 150px;
  color: white;
  text-decoration: none;
`;

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
