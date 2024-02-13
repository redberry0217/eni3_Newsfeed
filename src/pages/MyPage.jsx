import styled from 'styled-components';
import UserInfo from 'components/mypage/UserInfo';
import UserActivity from 'components/mypage/UserActivity';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../shared/firebase';
import { getAnimalIconUrl } from 'util/avatar';

function MyPage() {
  const navigate = useNavigate();

  const [imageUrl, setImageUrl] = useState('');

  let avatar;

  const getUserInfo = async (token) => {
    const user = auth.currentUser;
    if (user) {
      const uid = user.uid;
      const userDocRef = doc(db, 'users', uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        avatar = userData.avatar;
        token = userData.token;

        setImageUrl(getAnimalIconUrl(avatar, userData.token));

        console.log(`${imageUrl}`);
      }
    } else {
      console.log('사용자가 로그인되어 있지 않습니다.');
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  console.log('imageUrl', `${imageUrl}`);

  return (
    <>
      <GoBackBtn onClick={() => navigate(`/`)} title="코드카타 피드로 돌아갑니다">
        피드로 돌아가기
      </GoBackBtn>
      <img src={imageUrl} alt="User Icon" />
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
