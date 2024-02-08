import CodeKataForm from 'components/CodeKataForm';
import styled from 'styled-components';

function CodeSubmit() {
  return (
    <Container>
      <TitleArea>
        <h1>코드카타</h1>
        <p>반복되는 연습이라는 뜻을 가진 'Kata'를 통해 매일 코딩을 훈련해봅시다.</p>
      </TitleArea>
      <CodeKataForm />
      <CancelButton>취소하기</CancelButton>
    </Container>
  );
}

export default CodeSubmit;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 45px;
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

const CancelButton = styled.button`
  position: absolute;
  right: 2rem;
  bottom: 2rem;
  width: 180px;
  height: 40px;
  border: none;
  border-radius: 8px;
  background-color: #7f7f7f;
  color: white;
  cursor: pointer;
  font-weight: 600;
  font-size: 14pt;
  &:active {
    background-color: #929292;
  }
`;
