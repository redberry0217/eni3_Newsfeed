import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function CodeKataForm({
  value = { title: '', link: '', content: '', difficulty: '', code: '' },
  onSubmitHandler,
  editMode = false
}) {
  const navigate = useNavigate();

  const [codeText, setCodeText] = useState();
  const titleRef = useRef('');

  useEffect(() => {
    titleRef.current.focus();
  }, []);

  const onChangeCodeTextHandler = (e) => {
    setCodeText(e.target.value);
  };

  const codeTextTabHandler = (e) => {
    if (e.keyCode === 9) {
      e.preventDefault();

      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;

      const val = e.target.value;
      const updatedText = val.substring(0, start) + '  ' + val.substring(end);

      e.target.value = updatedText;
      e.target.selectionStart = e.target.selectionEnd = start + 2;

      setCodeText(updatedText);
    }
  };

  const confirmCancelBtnHandler = (event) => {
    event.preventDefault();
    const confirmCancel = window.confirm('작성을 취소하시겠습니까?');
    if (confirmCancel) {
      navigate(-1);
    } else {
      return;
    }
  };

  return (
    <FormArea onSubmit={onSubmitHandler}>
      <InputArea>
        <label>제목</label>
        <input
          type="text"
          name="title"
          placeholder="해결한 문제 제목을 입력해주세요."
          defaultValue={value.title}
          ref={titleRef}
        />
      </InputArea>
      <InputArea>
        <label>한마디</label>
        <input
          type="text"
          name="content"
          placeholder="해결한 문제에 대한 평을 입력해주세요."
          defaultValue={value.content}
        />
      </InputArea>
      <InputArea>
        <label>주소</label>
        <input type="text" name="link" placeholder="해결한 문제 주소를 입력해주세요." defaultValue={value.link} />
      </InputArea>
      <InputArea>
        <label>체감 난이도</label>
        <select name="difficulty" defaultValue={value.difficulty}>
          <option value="" disabled hidden>
            선택해주세요.
          </option>
          <option value="🌶️">🌶️</option>
          <option value="🌶️🌶️">🌶️🌶️</option>
          <option value="🌶️🌶️🌶️">🌶️🌶️🌶️</option>
          <option value="🌶️🌶️🌶️🌶️">🌶️🌶️🌶️🌶️</option>
          <option value="🌶️🌶️🌶️🌶️🌶️">🌶️🌶️🌶️🌶️🌶️</option>
        </select>
      </InputArea>
      <InputArea>
        <label>코드</label>
        <textarea
          name="code"
          placeholder="해결한 문제 코드를 입력해주세요."
          value={codeText}
          onChange={onChangeCodeTextHandler}
          onKeyDown={codeTextTabHandler}
        ></textarea>
      </InputArea>
      <ButtonArea>
        <button type="submit">{editMode ? '수정하기' : '등록하기'}</button>
        <button type="button" onClick={confirmCancelBtnHandler}>
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
  border-radius: 15px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-weight: 600;

  & label {
    padding-left: 6px;
  }
  & input,
  select,
  textarea {
    height: 35px;
    border-radius: 15px;
    border: 1px solid gray;
    padding-left: 15px;
  }
  & select {
    width: 200px;
  }
  & textarea {
    resize: none;
    height: 100px;
    padding-top: 10px;
  }
`;

const ButtonArea = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.5rem;
  & :nth-child(1) {
    width: 170px;
    height: 40px;
    border: none;
    border-radius: 15px;
    background-color: #2f89d1;
    color: white;
    cursor: pointer;
    font-weight: 600;
    font-size: 14pt;
    margin-left: auto;
  }
  & :nth-child(1):hover {
    background-color: #0b65ad;
    transition: background-color 0.4s ease;
  }

  & :nth-child(2) {
    width: 170px;
    height: 40px;
    border: none;
    border-radius: 15px;
    background-color: gray;
    color: white;
    cursor: pointer;
    font-weight: 600;
    font-size: 14pt;
  }
  & :nth-child(2):active {
    background-color: #929292;
  }
`;
