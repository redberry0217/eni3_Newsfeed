import styled from 'styled-components';
import UserInfo from 'components/UserInfo';
import UserActivity from 'components/UserActivity';

function MyPage() {
  return (
    <>
      <GoBackBtn>피드로 돌아가기</GoBackBtn>
      <MyPageContainer>
        <UserInfo>dd</UserInfo>
        <UserActivity>dd</UserActivity>
      </MyPageContainer>
    </>
  );
}

const MyPageContainer = styled.div`
  display: flex;
  width: 80%;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 20px;
  gap: 50px;
`;

const GoBackBtn = styled.button`
  background-color: #2f89d1;
  color: white;
  font-weight: 600;
  margin-top: 20px;
  margin-left: 150px;
  width: 150px;
  height: 30px;
  border: none;
  border-radius: 15px;
  cursor: pointer;

  &:hover {
    background-color: #0b65ad;
    transition: background-color 0.4s ease;
  }
`;
export default MyPage;
