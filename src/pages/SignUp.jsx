import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { setGithubLogin, setGooGleLogin } from 'shared/firebase';
import { FcGoogle } from 'react-icons/fc';
import { ImGithub } from 'react-icons/im';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc, collection, getDocs } from 'firebase/firestore';
import { db } from 'shared/firebase';
import { query, where } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from 'store/modules/users';

function SignUp() {
  const [emailId, setEmailId] = useState('');
  const [customDomain, setCustomDomain] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [status, setStatus] = useState('');
  const [fullEmail, setFullEmail] = useState('');
  const [avatar, setAvatar] = useState('cat');

  const dispatch = useDispatch();

  const iconOptions = useSelector((state) => state.iconOptions.iconOptions) || [];

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

    if (name === 'emailId') {
      setEmailId(value);
    } else if (name === 'customDomain') {
      setCustomDomain(value);
    }
  };

  useEffect(() => {
    setFullEmail(`${emailId}@${customDomain || selectedDomain}`);
  }, [emailId, customDomain, selectedDomain]);

  const onSelectChange = (event) => {
    const selectedOption = event.target.value;
    setSelectedDomain(selectedOption);
    if (selectedOption === '직접 쓰기') {
      setCustomDomain('');
    } else {
      setCustomDomain(selectedOption);
    }
  };

  const maxNickNameLength = 10;

  const nickNameChangeHandler = (event) => {
    const value = event.target.value.slice(0, maxNickNameLength);
    setNickname(value);
  };

  const token = iconOptions[0]?.token;

  const ChangeIconHandler = (e) => {
    const selectedAvatar = e.target.value;
    setAvatar(selectedAvatar);
  };

  const auth = getAuth();

  const ClickConfirmEmail = async () => {
    try {
      if (!emailId || !selectedDomain) {
        alert('이메일을 입력하세요.');
        return;
      }

      const emailQuery = query(collection(db, 'users'), where('fullEmail', '==', fullEmail));
      const querySnapShot = await getDocs(emailQuery);

      if (querySnapShot.docs.length > 0) {
        const confirmRedirect = window.confirm('이미 가입된 이메일입니다. 로그인 페이지로 이동하시겠습니까?');
        if (confirmRedirect) {
          navigate('/auth');
        }
      } else {
        alert('사용 가능한 이메일입니다.');
      }
    } catch (error) {
      console.error('error', error);
    }
  };

  const signUp = async (event) => {
    event.preventDefault();

    if (!emailId || !password || !confirmPassword || !nickname) {
      alert('필수 입력칸을 작성해주세요.');
      return;
    }

    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, fullEmail, password);
      const userDocRef = doc(db, 'users', userCredential.user.uid);
      const signUpDate = new Date().toISOString();

      const newUser = {
        fullEmail,
        nickname,
        status,
        avatar,
        token,
        signUpDate
      };

      await setDoc(userDocRef, newUser);
      dispatch(addUser({ ...newUser, id: userCredential.user.uid }));
      alert('회원가입이 완료되었습니다.');
      navigate('/');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('이미 가입된 이메일입니다.');
      } else if (error.code === 'auth/weak-password') {
        alert('비밀번호는 최소 6글자가 필요합니다.');
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
    <SignUpPage>
      <SignUpBox>
        <SignUpInputBox>
          <SignUpInputsTitle>회원가입</SignUpInputsTitle>
          <SignUpInputs>
            <div>
              <InputEmailTitle>이메일(아이디)*</InputEmailTitle>
              <InputEmailBox>
                <InputEmailId type="emailId" name="emailId" value={emailId} onChange={onChange} required></InputEmailId>
                <StyledAtSymbol>@</StyledAtSymbol>
                <InputEmailDomain
                  name="customDomain"
                  value={customDomain}
                  placeholder="example.com"
                  disabled={selectedDomain !== '직접 쓰기'}
                  onChange={onChange}
                ></InputEmailDomain>
                <StyledSelectDomain onChange={onSelectChange} value={selectedDomain}>
                  <option value="" disabled hidden>
                    선택해주세요
                  </option>
                  <option value="naver.com">naver.com</option>
                  <option value="gmail.com">gmail.com</option>
                  <option value="hanmail.com">hanmail.com</option>
                  <option value="nate.com">nate.com</option>
                  <option>직접 쓰기</option>
                </StyledSelectDomain>
                <CheckDuplicateEmailBtn onClick={ClickConfirmEmail}>중복 확인</CheckDuplicateEmailBtn>
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
                  onChange={nickNameChangeHandler}
                  placeholder="10자 이내로 작성할 수 있습니다."
                  required
                ></InputNickName>
              </div>
              <div>
                <IconTitle>아이콘*</IconTitle>
                <StyledSelectIcon name="icon" value={avatar} onChange={ChangeIconHandler} required>
                  {iconOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </StyledSelectIcon>
              </div>
              <div>
                {iconOptions.map((iconOption) => (
                  <StyledIconAnimal
                    key={iconOption.value}
                    src={iconOption.iconsrc}
                    alt="Animal Icon"
                    avatar={avatar}
                    value={iconOption.value}
                  />
                ))}
              </div>
            </NickNameAndIconSection>
            <div>
              <MyStatusTitle>나의 현재 상태</MyStatusTitle>
              <StyledSelectMyStatus name="status" value={status} onChange={(e) => setStatus(e.target.value)} required>
                <option value="" hidden>
                  선택해주세요
                </option>
                <option value="개발자 취준생">개발자 취준생</option>
                <option value="현업 개발자/튜터">현업 개발자/튜터</option>
                <option value="학생(전공/비전공)">학생(전공/비전공)</option>
                <option value="취미로 개발하는 사람">취미로 개발하는 사람</option>
                <option value="재야의 무림고수">재야의 무림고수</option>
              </StyledSelectMyStatus>
            </div>
          </SignUpInputs>
        </SignUpInputBox>
        <SignUpBtns>
          <SocialSignUpBtns>
            <p>소셜 계정으로 간편 회원 가입</p>
            <StyledFcGoogle onClick={googleLoginHandler}></StyledFcGoogle>
            <StyledImGithub onClick={githubLoginHandler}></StyledImGithub>
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

const InputEmailId = styled.input`
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
  font-size: 13pt;
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

const StyledIconAnimal = styled.img`
  width: 70px;
  height: 70px;
  margin-top: 30px;
  display: ${(props) => (props.avatar === props.value ? 'block' : 'none')};
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
