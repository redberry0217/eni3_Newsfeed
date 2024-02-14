import CodeKataForm from 'components/CodeKataForm';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth } from 'shared/firebase';
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
