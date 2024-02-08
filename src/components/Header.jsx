import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaUserCircle } from 'react-icons/fa';

function Header() {
  const navigate = useNavigate();
  const clickToHomePageHandler = () => {
    navigate('/');
  };
  const clickToMyPageHandler = () => {
    navigate('/auth');
  };

  return (
    <Background>
      <LogoAndTitle onClick={clickToHomePageHandler}>
        <img src="https://cdn2.iconfinder.com/data/icons/seo-web/512/website-code-512.png" alt="로고" width="65" />
        <p>
          <TitleText>E&I3</TitleText>
          <br />
          For Newbie Developers
        </p>
      </LogoAndTitle>
      <SubmitCodeBtn>오늘의 코드 제출하기</SubmitCodeBtn>
      <MypageIcon onClick={clickToMyPageHandler}>
        <StyledFaUserCircle />
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
  margin-left: 30px;
  margin-right: 150px;
`;

const StyledFaUserCircle = styled(FaUserCircle)`
  width: 50px;
  height: 50px;
  background-color: white;
  border-radius: 50%;
  cursor: pointer;
  border: none;
  box-sizing: border-box;

  &:hover {
    color: #0b65ad;
    transition: color 0.4s ease;
  }
`;

export default Header;
