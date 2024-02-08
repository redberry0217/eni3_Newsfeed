import styled from 'styled-components';
function MyPage() {
  return (
    <>
      <MyPageContainer>
        <UserInfo>dd</UserInfo>
        <UserActivity>dd</UserActivity>
      </MyPageContainer>
    </>
  );
}

const MyPageContainer = styled.div`
  display: flex;
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
`;

const UserInfo = styled.div`
  background-color: greenyellow;
`;

const UserActivity = styled.div`
  background-color: black;
`;

export default MyPage;
