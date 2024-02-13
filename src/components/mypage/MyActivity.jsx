import React from 'react';
import styled from 'styled-components';

function MyActivity({ filteredArticles, filteredComments }) {
  let level;
  let nextLevelTodo;

  if (filteredArticles.length >= 65) {
    level = 4;
    nextLevelTodo = 0;
  } else if (filteredArticles.length >= 41) {
    level = 3;
    nextLevelTodo = 65 - filteredArticles.length;
  } else if (filteredArticles.length >= 11) {
    level = 2;
    nextLevelTodo = 41 - filteredArticles.length;
  } else {
    level = 1;
    nextLevelTodo = 11 - filteredArticles.length;
  }

  return (
    <>
      <TitleTextStyle>🔥 나의 활동</TitleTextStyle>
      <hr />
      <ActivityBox>
        <MyLevel>
          <p>레벨</p>
          <p>
            <LevelTextStyle>{level}</LevelTextStyle>
          </p>
        </MyLevel>
        <MyActivityInfo>
          지금까지 <DigitStyle>{filteredArticles ? filteredArticles.length : 0}</DigitStyle> 문제 해결했습니다.
          <br />
          좋아요 <DigitStyle>{filteredArticles.like ? filteredArticles.like : 0}</DigitStyle>개, 댓글은{' '}
          <DigitStyle>{filteredComments ? filteredComments.length : 0}</DigitStyle>개 받았습니다.
          <br />
          앞으로 <DigitStyle>{nextLevelTodo}</DigitStyle> 문제 더 해결하면 레벨이 올라요!
        </MyActivityInfo>
      </ActivityBox>
    </>
  );
}

const ActivityBox = styled.div`
  display: flex;
  margin-top: 20px;
  margin-bottom: 20px;
  align-items: center;
  margin-left: 50px;
`;

const TitleTextStyle = styled.span`
  font-size: 18pt;
  color: #2f89d1;
  font-weight: 600;
`;

const MyLevel = styled.div`
  background-color: #ddecf8;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 15pt;
  width: 130px;
  height: 130px;
  border-radius: 15px;
  margin: 10px;
  padding: 20px;
`;

const LevelTextStyle = styled.span`
  font-size: 25pt;
  font-weight: 600;
`;

const DigitStyle = styled.span`
  font-size: 17pt;
  color: #2f89d1;
  font-weight: 600;
`;

const MyActivityInfo = styled.p`
  line-height: 2;
  padding: 20px;
  margin-left: 30px;
`;
export default MyActivity;
