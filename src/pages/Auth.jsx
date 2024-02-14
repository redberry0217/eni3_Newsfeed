import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, setGithubLogin, setGooGleLogin } from '../shared/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FcGoogle } from 'react-icons/fc';
import { ImGithub } from 'react-icons/im';
import { BsBoxArrowInRight } from 'react-icons/bs';
import styled from 'styled-components';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../shared/firebase';

function Auth() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const ClickToSignUpPageHandler = () => {
    navigate('/signup');
  };

  const onChange = (event) => {
    const {
      target: { name, value }
    } = event;
    if (name === 'email') {
      setEmail(value);
    }
    if (name === 'password') {
      setPassword(value);
    }
  };

  let nickname;

  const getUserInfo = async (uid) => {
    const userDocRef = doc(db, 'users', uid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      nickname = userData.nickname;
    } else {
      nickname = null;
    }
  };

  const signIn = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      alert('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      await getUserInfo(userCredential.user.uid);
      alert(`안녕하세요, ${nickname}님!`);
      navigate('/');
    } catch (error) {
      if (error.code === 'auth/invalid-credential') {
        alert('등록되지 않은 이메일이거나, 틀린 비밀번호입니다.');
      } else if (error.code === 'auth/invalid-email') {
        alert('올바른 이메일 형식이 아닙니다.');
      } else {
        console.error(error);
      }
    }
  };

  const googleLoginHandler = async () => {
    try {
      await setGooGleLogin();
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const githubLoginHandler = async () => {
    try {
      await setGithubLogin();
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <LoginPage>
      <LoginBox>
        <LoginTitle>LOGIN</LoginTitle>
        <LoginComment>
          E&I3에서 개발자의 꿈에 <br />한 걸음 더 다가가세요!
        </LoginComment>
        <form>
          <InputAreas>
            <InputEmail
              type="email"
              value={email}
              placeholder="이메일"
              name="email"
              onChange={onChange}
              required
            ></InputEmail>
            <InputPassword
              type="password"
              value={password}
              placeholder="비밀번호"
              name="password"
              onChange={onChange}
              required
            ></InputPassword>
          </InputAreas>
          <LoginBtn onClick={signIn}>로그인</LoginBtn>
        </form>
      </LoginBox>
      <BottomOfLoginPage>
        <SocialLoginBtns>
          <p>소셜 계정으로 간편 로그인</p>
          <StyledFcGoogle onClick={googleLoginHandler}></StyledFcGoogle>
          <StyledImGithub onClick={githubLoginHandler}></StyledImGithub>
        </SocialLoginBtns>
        <SignUpIcon onClick={ClickToSignUpPageHandler}>
          <StyledBsBoxArrowInRight />
          <p>회원가입</p>
        </SignUpIcon>
      </BottomOfLoginPage>
    </LoginPage>
  );
}

const LoginPage = styled.div`
  height: 75vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const LoginBox = styled.div`
  width: 800px;
  height: 450px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #f2f2f2;
  border-radius: 20px;
  gap: 20px;
`;

const LoginTitle = styled.div`
  color: #2f89d1;
  font-size: 30pt;
`;

const LoginComment = styled.div`
  font-size: 15pt;
  line-height: 1.3;
`;

const InputAreas = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const InputEmail = styled.input`
  width: 300px;
  height: 45px;
  border: 2px solid #5f5f5f;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 15pt;
`;

const InputPassword = styled.input`
  width: 300px;
  height: 45px;
  border: 2px solid #5f5f5f;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 15pt;
`;

const LoginBtn = styled.button`
  width: 300px;
  height: 50px;
  margin-top: 40px;
  border-radius: 20px;
  color: white;
  background-color: black;
  font-size: 18pt;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #0b65ad;
    transition: background-color 0.4s ease;
  }
`;

const BottomOfLoginPage = styled.div`
  width: 750px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SocialLoginBtns = styled.div`
  display: flex;
  align-items: center;
  font-size: 15pt;
  gap: 15px;
`;

const StyledFcGoogle = styled(FcGoogle)`
  width: 40px;
  height: 40px;
  background-color: transparent;
  border-radius: 100%;
  cursor: pointer;
`;

const StyledImGithub = styled(ImGithub)`
  width: 40px;
  height: 40px;
  background-color: transparent;
  border-radius: 100%;
  cursor: pointer;
`;

const SignUpIcon = styled.div`
  display: flex;
  align-items: center;
  font-size: 15pt;
  gap: 10px;
  cursor: pointer;
`;

const StyledBsBoxArrowInRight = styled(BsBoxArrowInRight)`
  width: 40px;
  height: 40px;
  background-color: transparent;
  cursor: pointer;
`;

export default Auth;
