import React from 'react';
import Header from './Header';
import styled from 'styled-components';

function Layout({ children }) {
  return (
    <div>
      <Header />
      <Main>{children}</Main>
    </div>
  );
}

const Main = styled.div`
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
`;

export default Layout;
