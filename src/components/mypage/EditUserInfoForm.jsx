import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { collection, getDocs } from 'firebase/firestore';
import { db } from 'shared/firebase';
import { query } from 'firebase/firestore';

function EditUserInfoForm({ setEditMode }) {
  const [selectedAvatar, setselectedAvatar] = useState('개발하는 고양이');
  const stateOptions = useSelector((state) => state.stateOptions.options);
  const iconOptions = useSelector((state) => state.iconOptions.options);

  const selectAvatarHandler = (event) => {
    setselectedAvatar(event.target.value);
  };

  const [currUserData, setCurrUserData] = useState([
    {
      fullEmail: '이메일@gmail.com',
      nickname: '닉네임',
      selectedIcon: 'cat',
      signUpDate: '2024년 2월 11일 오후 4시 44분 16초 UTC+9',
      status: '재야의 무림고수'
    }
  ]);
  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, 'users'));
      const querySnapshot = await getDocs(q);
      const initialUserData = [];

      querySnapshot.forEach((doc) => {
        const data = {
          id: doc.id,
          ...doc.data()
        };
        initialUserData.push(data);
      });

      setCurrUserData(initialUserData);
    };
    fetchData();
  }, []);

  return (
    <EditUserInfoFormBox>
      <WelcomeMsg>회원 정보 수정</WelcomeMsg>
      <EditItem>
        닉네임 <StyledInput placeholder="최대 10글자 입력 가능" />
      </EditItem>
      <EditItem>
        아이콘
        <StyledSelect value={selectedAvatar} onChange={selectAvatarHandler}>
          {iconOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </StyledSelect>
        {selectedAvatar && <img src={selectedAvatar.iconSrc} alt={selectedAvatar.label} />}
      </EditItem>
      <EditItem>
        나의 현재 상태
        <StyledSelect>
          {stateOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </StyledSelect>
        {/* <PreviewImage src={optionImages[selectedOption]} alt="미리보기 이미지" /> */}
      </EditItem>
      <EditBtns>
        <ConfirmButton>수정완료</ConfirmButton>
        <CancelButton onClick={() => setEditMode(false)}>취소하기</CancelButton>
      </EditBtns>
    </EditUserInfoFormBox>
  );
}

export default EditUserInfoForm;

const EditUserInfoFormBox = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
`;

const WelcomeMsg = styled.span`
  text-align: center;
  font-size: 18pt;
  margin-bottom: 50px;
`;

const EditItem = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 600;
`;

const StyledInput = styled.input`
  height: 35px;
  border-radius: 15px;
  border: 1px solid gray;
  margin-top: 10px;
  margin-bottom: 25px;
  padding-left: 15px;
`;

const StyledSelect = styled.select`
  height: 35px;
  border-radius: 15px;
  border: 1px solid gray;
  margin-top: 10px;
  margin-bottom: 25px;
  padding-left: 15px;
`;

const EditBtns = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const ConfirmButton = styled.button`
  background-color: #2f89d1;
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 15px;
  width: 120px;
  height: 35px;
  cursor: pointer;
`;

const CancelButton = styled.button`
  background-color: gray;
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 15px;
  width: 120px;
  height: 35px;
  cursor: pointer;
`;
