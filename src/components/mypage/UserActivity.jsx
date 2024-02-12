import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MyActivity from './MyActivity';
import MyCode from './MyCode';
import { useSelector } from 'react-redux';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from 'shared/firebase';

function UserActivity() {
  const user = useSelector((state) => state.loginAccess.user);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const q = query(collection(db, 'articles'), where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const articleData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setArticles(articleData);
        console.log(articleData);
      }
    };
    fetchData();
  }, [user]);

  return (
    <UserActivityBox>
      <MyActivity articles={articles} />
      <MyCode articles={articles} />
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
