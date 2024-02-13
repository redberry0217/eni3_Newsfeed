import React, { useEffect } from 'react';
import styled from 'styled-components';
import MyActivity from './MyActivity';
import MyCode from './MyCode';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function UserActivity() {
  const user = useSelector((state) => state.loginAccess.user);
  const articleList = useSelector((state) => state.article);
  const commentList = useSelector((state) => state.comment);
  const articles = articleList.filter((article) => article.userId === user.uid);
  const comments = commentList.filter((comment) => comment.userId === user.uid);

  if (!articles && !comments) {
    return <div>Now Loading...</div>;
  }

  const filteredArticles = articles ? articles.filter((article) => article.userId === user.uid) : [];
  const filteredComments = comments ? comments.filter((comment) => comment.userId === user.uid) : [];

  return (
    <UserActivityBox>
      <MyActivity filteredArticles={filteredArticles} filteredComments={filteredComments} />
      <MyCode filteredArticles={filteredArticles} />
    </UserActivityBox>
  );
}

const UserActivityBox = styled.div`
  width: 65%;
  min-height: 660px;
  border: 1px solid #e2e2e2;
  border-radius: 15px;
  padding: 40px;
  gap: 30px;
`;

export default UserActivity;
