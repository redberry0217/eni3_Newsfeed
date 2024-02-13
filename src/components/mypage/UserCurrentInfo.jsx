import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { dateFormat } from 'util/date';
import { getAnimalIconUrl } from 'util/avatar';

function UserCurrentInfo({ setEditMode }) {
  const { users, currentUser } = useSelector((state) => state.users);

  if (!users || !currentUser) return <div>Now Loading...</div>;

  const filteredUser = users.find((user) => user.id === currentUser.uid);

  if (!filteredUser) return <div>Now Loading...</div>;

  return (
    <>
      <WelcomeMsg>
        <UserNameStyle>{filteredUser.nickname}</UserNameStyle> 님, <br />
        오늘도 즐거운 코딩하세요!
      </WelcomeMsg>
      <UserIcon>
        <img src={getAnimalIconUrl(filteredUser.avatar, filteredUser.token)} width="60%" alt="유저 아이콘 이미지" />
      </UserIcon>
      <UserInfoContent>
        <UserInfoStyle>
          <ItemBox>가입일</ItemBox>
          {dateFormat(filteredUser.signUpDate)}
          <br />
          <ItemBox>이메일(아이디)</ItemBox>
          {filteredUser.fullEmail}
          <br />
          <ItemBox>현재 상태</ItemBox>
          {filteredUser.status ? filteredUser.status : '아직 설정하지 않았습니다.'}
        </UserInfoStyle>
      </UserInfoContent>
      <EditUserInfoBtn onClick={() => setEditMode(true)}>정보 수정하기</EditUserInfoBtn>
    </>
  );
}

export default UserCurrentInfo;

const WelcomeMsg = styled.div`
  font-size: 18pt;
  text-align: center;
  line-height: 1.5;
`;

const UserNameStyle = styled.span`
  color: #2f89d1;
  font-size: 18pt;
  font-weight: 600;
`;

const UserIcon = styled.div`
  width: 70%;
  text-align: center;
  margin-top: 40px;
  margin-bottom: 20px;
`;

const UserInfoContent = styled.div`
  width: 80%;
`;

const ItemBox = styled.span`
  color: #2f89d1;
  font-weight: 600;
  margin-top: 20px;
`;

const UserInfoStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  line-height: 1.5;
`;

const EditUserInfoBtn = styled.button`
  background-color: #2f89d1;
  width: 200px;
  margin-top: 30px;
  height: 40px;
  color: white;
  font-size: 13pt;
  font-weight: 600;
  border: none;
  border-radius: 15px;
  cursor: pointer;

  &:hover {
    background-color: #0b65ad;
    transition: background-color 0.4s ease;
  }
`;
