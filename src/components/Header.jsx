import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  return (
    <Background>
      <LogoAndTitle onClick={() => navigate(`/`)}>
        <img src="https://cdn2.iconfinder.com/data/icons/seo-web/512/website-code-512.png" alt="로고" width="65" />
        <p>
          <TitleText>E&I3</TitleText>
          <br />
          For Newbie Developers
        </p>
      </LogoAndTitle>
      <SubmitCodeBtn onClick={() => navigate(`/submit`)}>오늘의 코드 제출하기</SubmitCodeBtn>
      <MypageIcon>
        <img
          src="https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png"
          alt="유저아이콘"
          width="50"
        />
      </MypageIcon>
    </Background>
  );
}

const Background = styled.div`
  height: 100px;
  background-color: #ddecf8;
  border-bottom: solid 2px #c7c7c7;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: sticky;
  top: 0%;
  left: 0;
  right: 0;
  z-index: 1000;
`;

const LogoAndTitle = styled.div`
  margin-left: 150px;
  display: flex;
  align-items: center;
  gap: 15px;
  cursor: pointer;
`;

const TitleText = styled.span`
  color: #2f89d1;
  font-weight: 600;
  font-size: 30pt;
  cursor: pointer;
`;

const SubmitCodeBtn = styled.button`
  background-color: #2f89d1;
  color: white;
  font-weight: 600;
  font-size: 14pt;
  margin-left: auto;
  width: 220px;
  height: 50px;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #0b65ad;
    transition: background-color 0.4s ease;
  }
`;

const MypageIcon = styled.div`
  margin-left: 50px;
  margin-right: 150px;
`;
export default Header;
