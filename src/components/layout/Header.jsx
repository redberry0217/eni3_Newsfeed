import { signOut } from 'firebase/auth';
import React, { useEffect, useRef, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from 'shared/firebase';
import styled from 'styled-components';

function Header() {
  const { currentUser } = useSelector((state) => state.users);

  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const logOut = async (event) => {
    event.preventDefault();

    await signOut(auth);
    alert('로그아웃 되었습니다.');
    setDropdown(false);
    navigate('/');
  };

  const clickUserIconHandler = () => {
    if (currentUser) {
      toggleDropdown();
    } else {
      navigate('/auth');
    }
  };

  const toggleDropdown = () => {
    setDropdown((prevDropdown) => !prevDropdown);
  };

  useEffect(() => {
    const handleOutsideClose = (e) => {
      if (dropdown && dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdown(false);
      }
    };

    document.addEventListener('click', handleOutsideClose);

    return () => {
      document.removeEventListener('click', handleOutsideClose);
    };
  }, [dropdown]);

  // 오늘의 코드 제출하기 눌렀을 때 로그인이 필요할 시 alert
  const loginAlert = () => {
    alert('로그인이 필요합니다.');
  };

  return (
    <Background>
      <Container>
        <LogoAndTitleLink to="/">
          <LogoAndTitle>
            <img src="https://cdn2.iconfinder.com/data/icons/seo-web/512/website-code-512.png" alt="로고" width="65" />
            <p>
              <TitleText>E&I3</TitleText>
              <br />
              For Newbie Developers
            </p>
          </LogoAndTitle>
        </LogoAndTitleLink>
        {currentUser === null ? (
          <SubmitCodeBtn onClick={loginAlert} to="/auth">
            오늘의 코드 제출하기
          </SubmitCodeBtn>
        ) : (
          <SubmitCodeBtn to="/submit">오늘의 코드 제출하기</SubmitCodeBtn>
        )}
        <MypageIcon onClick={clickUserIconHandler} ref={dropdownRef}>
          <StyledFaUserCircle />
        </MypageIcon>
        <DropdownContent visible={dropdown ? 1 : 0}>
          <DropdownItem
            onClick={() => {
              navigate('/mypage');
              toggleDropdown();
            }}
          >
            마이페이지
          </DropdownItem>
          <DropdownItem onClick={logOut}>로그아웃</DropdownItem>
        </DropdownContent>
      </Container>
    </Background>
  );
}

const Background = styled.header`
  height: 100px;
  background-color: #ddecf8;
  border-bottom: solid 2px #c7c7c7;
  padding: 10px;
  position: sticky;
  top: 0%;
  left: 0;
  right: 0;
  z-index: 1000;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 1500px;
  width: 100%;
  margin: 0 auto;
`;

const LogoAndTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
`;

const LogoAndTitleLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const TitleText = styled.span`
  color: #2f89d1;
  font-weight: 600;
  font-size: 2rem;
  cursor: pointer;
  line-height: 1;
`;

const SubmitCodeBtn = styled(Link)`
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
  text-decoration: none;

  &:hover {
    background-color: #0b65ad;
    transition: background-color 0.4s ease;
  }
`;

const MypageIcon = styled.div`
  margin-left: 2rem;
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

const DropdownContent = styled.div`
  top: 80px;
  right: 105px;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
`;

const DropdownItem = styled.div`
  padding: 12px 16px;
  text-align: center;
  justify-content: center;
  text-decoration: none;
  display: block;
  color: #333;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
`;

export default Header;
