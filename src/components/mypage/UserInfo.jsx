import React, { useState } from 'react';
import styled from 'styled-components';
import EditUserInfoForm from './EditUserInfoForm';
import UserCurrentInfo from './UserCurrentInfo';
import { useSelector } from 'react-redux';

function UserInfo() {
  const [editMode, setEditMode] = useState(false);
  const { users, currentUser } = useSelector((state) => state.users);

  const filteredUser = currentUser && users.find((user) => user.id === currentUser.uid);

  return (
    <UserInfoContainer>
      {editMode ? (
        <EditUserInfoForm setEditMode={setEditMode} filteredUser={filteredUser} />
      ) : (
        <UserCurrentInfo setEditMode={setEditMode} filteredUser={filteredUser} />
      )}
    </UserInfoContainer>
  );
}

const UserInfoContainer = styled.div`
  background-color: #f2f2f2;
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
