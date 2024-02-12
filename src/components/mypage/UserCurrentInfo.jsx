import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from 'shared/firebase';
import { useSelector } from 'react-redux';
import { dateFormat } from 'util/date';

function UserCurrentInfo({ setEditMode }) {
  const [currUserData, setCurrUserData] = useState(null);
  const user = useSelector((state) => state.loginAccess.user);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const q = query(collection(db, 'users'));
        const querySnapshot = await getDocs(q);
        const userData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        if (userData.length > 0) {
          setCurrUserData(userData[0]);
        }
      }
    };
    fetchData();
  }, [user]);

  if (!currUserData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <WelcomeMsg>
        <UserNameStyle>{currUserData.nickname}</UserNameStyle> 님, <br />
        오늘도 즐거운 코딩하세요!
      </WelcomeMsg>
      <UserIcon>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/test-32d7a.appspot.com/o/AnimalIcons%2FOptionImg_cat.png?alt=media&token=470bf4b0-975d-4d2b-a924-a78554a2b97c"
          width="60%"
          alt="유저 아이콘 이미지"
        />
      </UserIcon>
      <UserInfoContent>
        <UserInfoStyle>
          <ItemBox>가입일</ItemBox>
          {dateFormat(currUserData.signUpDate.toDate())}
          <br />
          <ItemBox>이메일(아이디)</ItemBox>
          {currUserData.fullEmail} <br />
          <ItemBox>현재 상태</ItemBox>
          {currUserData.status ? currUserData.status : '아직 설정하지 않았습니다.'}
        </UserInfoStyle>
      </UserInfoContent>
      <EditUserInfoBtn onClick={() => setEditMode(true)}>정보 수정하기</EditUserInfoBtn>
    </>
  );
}

export default UserCurrentInfo;

const WelcomeMsg = styled.div`
  font-size: 18pt;
  text-align: center;
  line-height: 1.5;
`;

const UserNameStyle = styled.span`
  color: #2f89d1;
  font-size: 18pt;
  font-weight: 600;
`;

const UserIcon = styled.div`
  width: 70%;
  text-align: center;
  margin-top: 40px;
  margin-bottom: 20px;
`;

const UserInfoContent = styled.div`
  width: 80%;
`;

const ItemBox = styled.span`
  color: #2f89d1;
  font-weight: 600;
  margin-top: 20px;
`;

const UserInfoStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  line-height: 1.5;
`;

const EditUserInfoBtn = styled.button`
  background-color: #2f89d1;
  width: 200px;
  margin-top: 30px;
  height: 40px;
  color: white;
  font-size: 13pt;
  font-weight: 600;
  border: none;
  border-radius: 15px;
  cursor: pointer;

  &:hover {
    background-color: #0b65ad;
    transition: background-color 0.4s ease;
  }
`;
