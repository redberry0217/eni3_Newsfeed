import React from 'react';
import styled from 'styled-components';

function UserInfo() {
  return (
    <UserInfoBox>
      <WelcomeMsg>
        <UserNameStyle>뉴비 개발자</UserNameStyle> 님, <br />
        오늘도 즐거운 코딩하세요!
      </WelcomeMsg>
      <UserIcon>
        <img src="https://cdn-icons-png.flaticon.com/512/3209/3209928.png" width="60%" alt="유저 아이콘 이미지" />
      </UserIcon>
      <UserInfoContent>
        <UserInfoStyle>
          <ItemBox>가입일</ItemBox> 2024-02-06
          <br />
          <ItemBox>이메일(아이디)</ItemBox> abc@gmail.com
          <br />
          <ItemBox>현재 상태</ItemBox> 개발자 취준생
        </UserInfoStyle>
      </UserInfoContent>
      <EditUserInfoBtn>정보 수정하기</EditUserInfoBtn>
    </UserInfoBox>
  );
}

const UserInfoBox = styled.div`
  background-color: #e9e9e9;
  border-radius: 15px;
  width: 35%;
  height: 660px;
  padding: 20px;
  padding-top: 35px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

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
  width: 100%;
  text-align: center;
  margin-top: 40px;
  margin-bottom: 40px;
`;

const UserInfoContent = styled.div``;

const ItemBox = styled.span`
  width: 200px;
  background-color: #2f89d1;
  color: white;
  border-radius: 5px;
  font-weight: 600;
`;

const UserInfoStyle = styled.p`
  line-height: 2;
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
export default UserInfo;
