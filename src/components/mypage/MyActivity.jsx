import React from 'react';
import styled from 'styled-components';

function MyActivity() {
  return (
    <>
      <TitleTextStyle>🔥 나의 활동</TitleTextStyle>
      <hr />
      <ActivityBox>
        <MyLevel>
          <p>레벨</p>
          <p>
            <LevelTextStyle>1</LevelTextStyle>
          </p>
        </MyLevel>
        <MyActivityInfo>
          지금까지 <DigitStyle>5</DigitStyle> 문제 해결했습니다.
          <br />
          나의 코드에 좋아요 총 <DigitStyle>52</DigitStyle>개,
          <br />
          댓글은 총 <DigitStyle>1</DigitStyle>개 받았습니다.
          <br />
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
