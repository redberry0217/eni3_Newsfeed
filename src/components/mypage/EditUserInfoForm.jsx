import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { STATE_OPTIONS } from 'constant/stateOptions';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from 'shared/firebase';
import { modUser } from 'store/modules/users';

function EditUserInfoForm({ setEditMode, filteredUser }) {
  const dispatch = useDispatch();
  // const [previewImage, setPreviewImage] = useState(null);
  const iconOptions = useSelector((state) => state.iconOptions.iconOptions);

  const myId = filteredUser.id;

  const onSubmitHandler = async (e) => {
    setEditMode(true);
    e.preventDefault();

    const nickname = e.target.nickname.value;
    const icon = e.target.icon.value;
    const state = e.target.state.value;

    if (!nickname) {
      alert('닉네임은 필수 입력 항목입니다.');
      return;
    }

    try {
      const updateUser = {
        nickname: nickname,
        avatar: icon,
        status: state
      };
      await updateDoc(doc(db, 'users', myId), updateUser);
      dispatch(modUser({ ...filteredUser, ...updateUser }));
      setEditMode(false);
    } catch (error) {
      alert('정보 수정에 실패했습니다.');
    }
  };

  const cancelHandler = () => {
    const confirmCancel = window.confirm(`정보 수정을 취소하시겠습니까?`);
    if (confirmCancel) {
      setEditMode(false);
    }
  };

  return (
    <EditUserInfoFormBox onSubmit={onSubmitHandler}>
      <WelcomeMsg>회원 정보 수정</WelcomeMsg>
      <EditItem>
        닉네임 <StyledInput name="nickname" placeholder="최대 10글자 입력 가능" defaultValue={filteredUser.nickname} />
      </EditItem>
      <EditItem>
        아이콘
        <StyledSelect name="icon" defaultValue={filteredUser.avatar}>
          {iconOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </StyledSelect>
        {/* {previewImage && <img src={previewImage} alt="아바타 미리보기" />} */}
      </EditItem>
      <EditItem>
        나의 현재 상태
        <StyledSelect name="state" defaultValue={filteredUser.status}>
          {STATE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </StyledSelect>
      </EditItem>
      <EditBtns>
        <ConfirmButton type="submit">수정완료</ConfirmButton>
        <CancelButton type="button" onClick={cancelHandler}>
          취소하기
        </CancelButton>
      </EditBtns>
    </EditUserInfoFormBox>
  );
}

export default EditUserInfoForm;

const EditUserInfoFormBox = styled.form`
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
