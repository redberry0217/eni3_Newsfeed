import React from 'react';
import styled from 'styled-components';

function CodeKataForm() {
  return (
    <FormArea>
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
      <button>등록하기</button>
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
  & button {
    width: 180px;
    height: 40px;
    border: none;
    border-radius: 8px;
    background-color: #202b3d;
    color: white;
    margin: 0 215px 0 auto;
    cursor: pointer;
    font-weight: 600;
    font-size: 14pt;
  }
  & button:active {
    background-color: #2e3e57;
  }
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
