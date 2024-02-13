import CodeKataForm from 'components/CodeKataForm';
import { addDoc, collection } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth, db } from 'shared/firebase';
import { addArticle } from 'store/modules/article';
import styled from 'styled-components';
import { createArticle } from 'util/getDocs';

function CodeSubmit() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const content = e.target.content.value;
    const link = e.target.link.value;
    const difficulty = e.target.difficulty.value;
    const code = e.target.code.value;

    if (!title || !content || !link || !difficulty || !code) {
      return alert('모든 항목을 작성해주세요.');
    }

    const nextCodeKata = {
      userId: auth.currentUser.uid,
      createdAt: new Date().toISOString(),
      liked: [],
      title,
      content,
      link,
      difficulty,
      code
    };

    const { id } = await createArticle(nextCodeKata);
    dispatch(addArticle({ ...nextCodeKata, id }));
    e.target.reset();
    alert('등록 완료!');
    navigate('/');
  };

  return (
    <Container>
      <TitleArea>
        <h1>코드카타</h1>
        <p>반복되는 연습이라는 뜻을 가진 'Kata'를 통해 매일 코딩을 훈련해봅시다.</p>
      </TitleArea>
      <CodeKataForm onSubmitHandler={onSubmitHandler} />
    </Container>
  );
}

export default CodeSubmit;

const Container = styled.div`
  width: 1000px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 45px auto 0;
`;

const TitleArea = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  & h1 {
    font-size: 2rem;
    font-weight: bold;
    color: #1380b6;
  }
`;
