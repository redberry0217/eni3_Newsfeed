import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function CodeKataForm() {
  // <----- 수정 예정 ----->
  const [codeKata, setCodeKata] = useState([]);
  const navigate = useNavigate();

  // creatdAt, author_id, article_title, article_content, article_link, article_code, article_like
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const article_title = e.target.article_title.value;
    const article_content = e.target.article_content.value;
    const article_link = e.target.article_link.value;
    const article_difficulty = e.target.article_difficulty.value;
    const article_code = e.target.article_code.value;
    const creatdAt = new Date().toLocaleDateString('ko-KR', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });

    const nextCodeKata = {
      // author_id
      creatdAt,
      article_title,
      article_content,
      article_link,
      article_difficulty,
      article_code
    };

    setCodeKata((prevCodeKata) => [nextCodeKata, ...prevCodeKata]);
    console.log(codeKata);
    e.target.reset();
  };
  // <----- 수정 예정 ----->

  return (
    <FormArea onSubmit={onSubmitHandler}>
      <InputArea>
        <label>제목</label>
        <input type="text" name="article_title" placeholder="해결한 문제 제목을 입력해주세요." />
      </InputArea>
      <InputArea>
        <label>한마디</label>
        <input type="text" name="article_content" placeholder="해결한 문제에 대한 평을 입력해주세요." />
      </InputArea>
      <InputArea>
        <label>주소</label>
        <input type="text" name="article_link" placeholder="해결한 문제 주소를 입력해주세요." />
      </InputArea>
      <InputArea>
        <label>체감 난이도</label>
        <select name="article_difficulty">
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
        <textarea name="article_code" placeholder="해결한 문제 코드를 입력해주세요."></textarea>
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
