import React from 'react';
import styled from 'styled-components';

function MyCode() {
  return (
    <>
      <TitleTextStyle>✏️ 나의 코드</TitleTextStyle>
      <hr />
      <StyledTable>
        <thead>
          <tr>
            <th className="date">날짜</th>
            <th className="title">게시글 제목</th>
            <th className="difficulty">체감난이도</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2024-02-06</td>
            <td>두 수의 합</td>
            <td>⭐⭐⭐⭐⭐</td>
          </tr>
          <tr>
            <td>2024-02-06</td>
            <td>두 수의 곱</td>
            <td>⭐⭐⭐</td>
          </tr>
          <tr>
            <td>2024-02-06</td>
            <td>제목이 길어지면 이런 느낌입니다 Hidden, Ellipsis 왜 적용이 안될까요?</td>
            <td>⭐⭐⭐⭐⭐</td>
          </tr>
        </tbody>
      </StyledTable>
    </>
  );
}

const TitleTextStyle = styled.span`
  font-size: 18pt;
  color: #2f89d1;
  font-weight: 600;
`;

const StyledTable = styled.table`
  width: 95%;
  margin: 0 auto;
  border-collapse: collapse;
  margin-top: 30px;
  table-layout: fixed;

  th {
    border: 1px solid #dddddd;
    font-weight: 600;
    padding: 8px;
    background-color: #f2f2f2;
  }
  td {
    border: 1px solid #dddddd;
    padding: 8px;
    text-align: center;
    line-height: 1.5;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  tr:hover {
    background-color: #f0f0f0;
  }

  .date {
    width: 20%;
  }

  .title {
    width: 50%;
  }

  .difficulty {
    width: 30%;
  }
`;
export default MyCode;
