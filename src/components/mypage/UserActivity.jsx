import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MyActivity from './MyActivity';
import MyCode from './MyCode';
import { useSelector } from 'react-redux';
import { getArticles, getComments } from 'util/getDocs';

function UserActivity() {
  const [articles, setArticles] = useState([]);
  const [comments, setComments] = useState([]);
  const loginUser = useSelector((state) => state.loginAccess.user);

  useEffect(() => {
    getArticles().then((data) => setArticles(data));
    getComments().then((data) => setComments(data));
  }, []);

  if (!articles && !comments) {
    return <div>Now Loading...</div>;
  }

  const filteredArticles = articles ? articles.find((article) => article.userId === loginUser.uid) : [];
  const filteredComments = comments ? comments.find((comment) => comment.userId === loginUser.uid) : [];
  console.log('걸러진 글', filteredArticles);
  console.log('걸러진 댓글', filteredComments);

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
