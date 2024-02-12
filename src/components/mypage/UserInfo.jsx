import React, { useState } from 'react';
import styled from 'styled-components';
import EditUserInfoForm from './EditUserInfoForm';
import UserCurrentInfo from './UserCurrentInfo';

function UserInfo() {
  const [editMode, setEditMode] = useState(false);

  return (
    <UserInfoContainer>
      {editMode ? <EditUserInfoForm setEditMode={setEditMode} /> : <UserCurrentInfo setEditMode={setEditMode} />}
    </UserInfoContainer>
  );
}

const UserInfoContainer = styled.div`
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

export default UserInfo;