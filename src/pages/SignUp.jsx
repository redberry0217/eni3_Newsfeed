import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, setGithubLogin, setGooGleLogin } from '../firebase';
import { FcGoogle } from 'react-icons/fc';
import { ImGithub } from 'react-icons/im';
import { LuCat } from 'react-icons/lu';
import { LuDog } from 'react-icons/lu';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [email, setEmail] = useState('');
  const [customDomain, setCustomDomain] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');

  const [icon, setIcon] = useState('');
  const [status, setStatus] = useState('');

  const navigate = useNavigate();

  const CancelSignUpHandler = () => {
    const cancelConfirm = window.confirm('가입을 취소하시겠습니까?');
    if (cancelConfirm) {
      navigate('/');
    } else {
      return;
    }
  };

  const onChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'customDomain') {
      setCustomDomain(value);
    }
  };

  const onSelectChange = (event) => {
    const selectedOption = event.target.value;
    setSelectedDomain(selectedOption);
    if (selectedOption === '직접 쓰기') {
      setCustomDomain('');
    } else {
      setCustomDomain(selectedOption);
    }
  };

  const iconOptions = [
    { value: 'cat', label: '개발하는 고양이', icon: <IconLuCat /> },
    { value: 'dog', label: '개발하는 강아지', icon: <IconLuDog /> },
    { value: 'hamster', label: '개발하는 햄스터', icon: <IconLuCat /> },
    { value: 'chick', label: '개발하는 병아리', icon: <IconLuCat /> }
  ];

  const [selectedIcon, setSelectedOption] = useState(iconOptions[0].value);

  const ChangeIconHandler = (e) => {
    setSelectedOption(e.target.value);
  };

  const signUp = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SignUpPage>
      <SignUpBox>
        <SignUpInputBox>
          <SignUpInputsTitle>회원가입</SignUpInputsTitle>
          <SignUpInputs>
            <div>
              <InputEmailTitle>이메일(아이디)*</InputEmailTitle>
              <InputEmailBox>
                <InputEmail type="email" name="email" value={email} onChange={onChange} required></InputEmail>
                <StyledAtSymbol>@</StyledAtSymbol>
                <InputEmailDomain
                  name="customDomain"
                  value={customDomain}
                  placeholder="example.com"
                  disabled={selectedDomain !== '직접 쓰기'}
                  onChange={onChange}
                ></InputEmailDomain>
                <StyledSelectDomain onChange={onSelectChange}>
                  <option value="" disabled selected hidden>
                    선택해주세요
                  </option>
                  <option>naver.com</option>
                  <option>gmail.com</option>
                  <option>hanmail.com</option>
                  <option>nate.com</option>
                  <option>직접 쓰기</option>
                </StyledSelectDomain>
                <CheckDuplicateEmailBtn>중복 확인</CheckDuplicateEmailBtn>
              </InputEmailBox>
            </div>
            <InputPasswordBox>
              <div>
                <InputPasswordTitle>비밀번호*</InputPasswordTitle>
                <InputPassword
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></InputPassword>
              </div>
              <div>
                <InputConfirmPasswordTitle>비밀번호 확인*</InputConfirmPasswordTitle>
                <InputConfirmPassword
                  type="password"
                  name="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                ></InputConfirmPassword>
              </div>
            </InputPasswordBox>
            <NickNameAndIconSection>
              <div>
                <NickNameTitle>닉네임*</NickNameTitle>
                <InputNickName
                  type="text"
                  name="nickname"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  required
                ></InputNickName>
              </div>
              <div>
                <IconTitle>아이콘*</IconTitle>
                <StyledSelectIcon name="icon" value={selectedIcon} onChange={ChangeIconHandler} required>
                  {iconOptions.map((iconOptions) => (
                    <option key={iconOptions.value} value={iconOptions.value}>
                      {iconOptions.label}
                    </option>
                  ))}
                </StyledSelectIcon>
              </div>
              <div>{iconOptions.find((option) => option.value === selectedIcon)?.icon}</div>
            </NickNameAndIconSection>
            <div>
              <MyStatusTitle>나의 현재 상태</MyStatusTitle>
              <StyledSelectMyStatus name="status" value={status} onChange={(e) => setStatus(e.target.value)} required>
                <option value="" disabled selected hidden>
                  선택해주세요
                </option>
                <option>주니어 개발자</option>
                <option>시니어 개발자</option>
                <option>프리랜서</option>
                <option>학생</option>
              </StyledSelectMyStatus>
            </div>
          </SignUpInputs>
        </SignUpInputBox>
        <SignUpBtns>
          <SocialSignUpBtns>
            <p>소셜 계정으로 가입</p>
            <StyledFcGoogle onClick={setGooGleLogin}></StyledFcGoogle>
            <StyledImGithub onClick={setGithubLogin}></StyledImGithub>
          </SocialSignUpBtns>
          <SignUpOptionBtns>
            <ConfirmSignUpBtn onClick={signUp}>가입하기</ConfirmSignUpBtn>
            <CancelSignUpBtn onClick={CancelSignUpHandler}>취소하기</CancelSignUpBtn>
          </SignUpOptionBtns>
        </SignUpBtns>
      </SignUpBox>
    </SignUpPage>
  );
}

const SignUpPage = styled.div`
  height: 75vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const SignUpInputsTitle = styled.div`
  display: flex;
  font-size: 35px;
  color: #2f89d1;
  padding: 15px;
  border-bottom: solid 2px #c7c7c7;
`;

const SignUpBox = styled.div`
  width: 1300px;
  height: 600px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const SignUpInputBox = styled.div`
  width: 1300px;
  height: 550px;
  display: flex;
  flex-direction: column;
  border-bottom: solid 2px #c7c7c7;
`;

const SignUpInputs = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
  gap: 30px;
`;

const InputEmailBox = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const InputEmailTitle = styled.div`
  font-size: 15pt;
  margin-left: 8px;
  margin-bottom: 8px;
`;

const InputEmail = styled.input`
  width: 300px;
  height: 45px;
  border: 2px solid #5f5f5f;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 15pt;
`;

const InputEmailDomain = styled.input`
  width: 300px;
  height: 45px;
  border: 2px solid #5f5f5f;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 15pt;
`;

const StyledAtSymbol = styled.div`
  font-size: 20pt;
  margin-left: 3px;
  margin-right: 3px;
`;

const StyledSelectDomain = styled.select`
  width: 300px;
  height: 45px;
  border: 2px solid #5f5f5f;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 15pt;
`;

const CheckDuplicateEmailBtn = styled.button`
  width: 200px;
  height: 50px;
  margin-left: 10px;
  border-radius: 20px;
  color: white;
  background-color: black;
  font-size: 18pt;
  border: none;
  cursor: pointer;
`;

const InputPasswordBox = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
`;

const InputPasswordTitle = styled.div`
  font-size: 15pt;
  margin-left: 8px;
  margin-bottom: 8px;
`;

const InputPassword = styled.input`
  width: 300px;
  height: 45px;
  border: 2px solid #5f5f5f;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 15pt;
`;

const InputConfirmPasswordTitle = styled.div`
  font-size: 15pt;
  margin-left: 8px;
  margin-bottom: 8px;
`;

const InputConfirmPassword = styled.input`
  width: 300px;
  height: 45px;
  border: 2px solid #5f5f5f;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 15pt;
`;

const NickNameAndIconSection = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
`;

const NickNameTitle = styled.div`
  font-size: 15pt;
  margin-left: 8px;
  margin-bottom: 8px;
`;

const InputNickName = styled.input`
  width: 300px;
  height: 45px;
  border: 2px solid #5f5f5f;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 15pt;
`;

const IconTitle = styled.div`
  font-size: 15pt;
  margin-left: 8px;
  margin-bottom: 8px;
`;

const StyledSelectIcon = styled.select`
  width: 300px;
  height: 45px;
  border: 2px solid #5f5f5f;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 15pt;
`;

const IconLuCat = styled(LuCat)`
  width: 40px;
  height: 40px;
  margin-top: 30px;
  background-color: transparent;
`;

const IconLuDog = styled(LuDog)`
  width: 40px;
  height: 40px;
  margin-top: 30px;
  background-color: transparent;
`;

const MyStatusTitle = styled.div`
  font-size: 15pt;
  margin-left: 8px;
  margin-bottom: 8px;
`;

const StyledSelectMyStatus = styled.select`
  width: 300px;
  height: 45px;
  border: 2px solid #5f5f5f;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 15pt;
`;

const SocialSignUpBtns = styled.div`
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

const SignUpBtns = styled.div`
  width: 1300px;
  height: 50px;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SignUpOptionBtns = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ConfirmSignUpBtn = styled.button`
  width: 230px;
  height: 50px;
  margin-left: 10px;
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

const CancelSignUpBtn = styled.button`
  width: 230px;
  height: 50px;
  margin-left: 10px;
  border-radius: 20px;
  color: white;
  background-color: #929292;
  font-size: 18pt;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #0b65ad;
    transition: background-color 0.4s ease;
  }
`;

export default SignUp;
