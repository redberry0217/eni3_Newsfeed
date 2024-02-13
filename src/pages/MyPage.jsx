import UserActivity from 'components/mypage/UserActivity';
import UserInfo from 'components/mypage/UserInfo';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function MyPage() {
  const navigate = useNavigate();
  const loginUser = useSelector((state) => state.users.currentUser);
  const loading = useSelector((state) => state.loading);

  if (!loginUser && !loading) navigate('/');

  return (
    <>
      <GoBackBtn onClick={() => navigate(`/`)} title="코드카타 피드로 돌아갑니다">
        피드로 돌아가기
      </GoBackBtn>
      <MyPageContainer>
        <UserInfo />
        <UserActivity />
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
