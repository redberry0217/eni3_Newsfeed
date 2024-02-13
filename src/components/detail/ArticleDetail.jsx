import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { delArticle, likeArticle } from 'store/modules/article';
import styled from 'styled-components';
import { dateFormat } from 'util/date';
import Prism from 'prismjs';
import 'prism.css';
import { auth } from 'shared/firebase';
import { deleteArticle, updateArticle } from 'util/getDocs';
import { useNavigate } from 'react-router-dom';
import { getAnimalIconUrl } from 'util/avatar';

function ArticleDetail({ article, editBtnHandler }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userList = useSelector((state) => state.users);
  const { id, userId, title, createdAt, content, code, liked, link, difficulty } = article;
  const { nickname, avatar, token } = userList.users.find((user) => user.id === userId);

  const likeBtnHandler = () => {
    const currentUserId = auth.currentUser.uid;
    dispatch(likeArticle({ id, currentUserId }));
    const updated = liked.includes(currentUserId)
      ? { ...article, liked: liked.filter((user) => user !== currentUserId) }
      : { ...article, liked: [...liked, currentUserId] };
    updateArticle(id, updated);
  };

  const delBtnHandler = () => {
    if (!window.confirm('삭제하시겠습니까?')) return null;
    dispatch(delArticle(id));
    deleteArticle(id);
    navigate('/');
  };

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <>
      <Article>
        <Title>{title}</Title>
        <Author>
          <Avatar src={getAnimalIconUrl(avatar, token)} alt={nickname} />
          <NickName>{nickname}</NickName>
          <time>{dateFormat(createdAt)}</time>
          {auth.currentUser?.uid && userId === auth.currentUser?.uid ? (
            <>
              <Button type="button" onClick={editBtnHandler}>
                수정
              </Button>
              <Button type="button" onClick={delBtnHandler}>
                삭제
              </Button>
            </>
          ) : null}
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
        <LikeButton type="button" onClick={likeBtnHandler}>
          ❤️ {liked?.length}
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

  time {
    margin-left: auto;
    font-size: 90%;
    color: #666;
  }
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

export default ArticleDetail;
