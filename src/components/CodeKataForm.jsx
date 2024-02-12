import { getAuth } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { db } from 'shared/firebase';
import { addArticle } from 'store/modules/article';
import styled from 'styled-components';
import { dateFormat } from 'util/date';

function CodeKataForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = getAuth();

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
      createdAt: dateFormat(new Date()),
      like: 0,
      title,
      content,
      link,
      difficulty,
      code
    };

    dispatch(addArticle(nextCodeKata));
    e.target.reset();

    // firebase 데이터 추가
    const collectionRef = collection(db, 'articles');
    await addDoc(collectionRef, nextCodeKata);

    // 등록 되면서 홈으로 이동
    navigate('/');
  };

  return (
    <FormArea onSubmit={onSubmitHandler}>
      <InputArea>
        <label>제목</label>
        <input type="text" name="title" placeholder="해결한 문제 제목을 입력해주세요." />
      </InputArea>
      <InputArea>
        <label>한마디</label>
        <input type="text" name="content" placeholder="해결한 문제에 대한 평을 입력해주세요." />
      </InputArea>
      <InputArea>
        <label>주소</label>
        <input type="text" name="link" placeholder="해결한 문제 주소를 입력해주세요." />
      </InputArea>
      <InputArea>
        <label>체감 난이도</label>
        <select name="difficulty">
          <option value="">별점을 선택해주세요.</option>
          <option value="⭐">⭐</option>
          <option value="⭐⭐">⭐⭐</option>
          <option value="⭐⭐⭐">⭐⭐⭐</option>
          <option value="⭐⭐⭐⭐">⭐⭐⭐⭐</option>
          <option value="⭐⭐⭐⭐⭐">⭐⭐⭐⭐⭐</option>
        </select>
      </InputArea>
      <InputArea>
        <label>코드</label>
        <textarea name="code" placeholder="해결한 문제 코드를 입력해주세요."></textarea>
      </InputArea>
      <ButtonArea>
        <button type="submit">등록하기</button>
        <button type="button" onClick={() => navigate('/')}>
          취소하기
        </button>
      </ButtonArea>
    </FormArea>
  );
}

export default CodeKataForm;

const FormArea = styled.form`
  background-color: #f2f2f2;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  border-radius: 8px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  & label {
    padding-left: 6px;
  }
  & input,
  select,
  textarea {
    padding: 5px 8px;
    border: 2px solid #7f7f7f;
    border-radius: 8px;
  }
  & select {
    width: 200px;
  }
  & textarea {
    resize: none;
    height: 100px;
  }
`;

const ButtonArea = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2rem;
  & :nth-child(1) {
    width: 180px;
    height: 40px;
    border: none;
    border-radius: 8px;
    background-color: #202b3d;
    color: white;
    cursor: pointer;
    font-weight: 600;
    font-size: 14pt;
    margin-left: auto;
  }
  & :nth-child(1):active {
    background-color: #2e3e57;
  }
  & :nth-child(2) {
    width: 180px;
    height: 40px;
    border: none;
    border-radius: 8px;
    background-color: #7f7f7f;
    color: white;
    cursor: pointer;
    font-weight: 600;
    font-size: 14pt;
  }
  & :nth-child(2):active {
    background-color: #929292;
  }
`;
