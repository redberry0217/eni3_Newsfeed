import SpinnerImage from 'assets/Spinner.svg';
import styled from 'styled-components';
function Loading() {
  return (
    <Section>
      <img src={SpinnerImage} alt="loading" />
    </Section>
  );
}

const Section = styled.section`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

export default Loading;
