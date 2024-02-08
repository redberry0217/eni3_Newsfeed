import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';

function EditUserInfoForm({ setEditMode }) {
  const [selectedAvatar, setselectedAvatar] = useState('개발하는 고양이');

  const selectAvatarHandler = (event) => {
    setselectedAvatar(event.target.value);
  };

  return (
    <EditUserInfoFormBox>
      <WelcomeMsg>회원 정보 수정</WelcomeMsg>
      <EditItem>
        닉네임 <StyledInput placeholder="최대 10글자 입력 가능" />
      </EditItem>
      <EditItem>
        아이콘
        <StyledSelect value={selectedAvatar} onChange={selectAvatarHandler}>
          {Object.keys(optionImages).map((option, index) => {
            return <option key={index}>{option}</option>;
          })}
        </StyledSelect>
      </EditItem>
      <EditItem>
        나의 현재 상태
        <StyledSelect>
          <option>개발자 취준생</option>
          <option>현업 개발자/튜터</option>
          <option>학생(전공/비전공)</option>
          <option>취미로 개발하는 사람</option>
          <option>재야의 무림고수</option>
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

const optionImages = {
  '개발하는 고양이': '고양이 이미지 경로',
  '개발하는 강아지': '강아지 이미지 경로',
  '개발하는 여우': '여우 이미지 경로',
  '개발하는 앵무새': '앵무새 이미지 경로'
};

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
`;

const CancelButton = styled.button`
  background-color: gray;
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 15px;
  width: 120px;
  height: 35px;
`;
