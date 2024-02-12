import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { delArticle } from 'store/modules/article';
import { useDispatch } from 'react-redux';

function MyCode({ articles }) {
  const dispatch = useDispatch();
  const deleteHandler = (articleId) => {
    const checkIf = window.confirm('해당 게시글을 삭제하시겠습니까?');
    if (checkIf) {
      dispatch(delArticle(articleId));
    } else {
      return;
    }
  };
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
            <th className="delete">관리</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article.id}>
              <td>{article.createdAt.toDate().toLocaleDateString()}</td>
              <td>
                <Link to={`/detail/${article.id}`}>{article.title}</Link>
              </td>
              <td>{article.difficulty}</td>
              <td>
                <Deletebutton onClick={() => deleteHandler(article.id)} title="게시글을 삭제합니다.">
                  ❌
                </Deletebutton>
              </td>
            </tr>
          ))}
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
    width: 40%;
  }

  .difficulty {
    width: 30%;
  }

  .control {
    width: 10%;
  }
`;

const Deletebutton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;
export default MyCode;
